import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { toast } from "react-toastify";
import UserService from "../../services/user";
import Button from "../../components/Button";
import { useState, useContext } from "react";
import { AuthContext } from "../../contexts/auth";

const schema = z.object({
  email: z.string().email("E-mail inválido"),
  password: z.string().min(6, "A senha deve ter pelo menos 6 caracteres"),
});

export default function LoginPage() {
  const navigate = useNavigate();
  const { login } = useContext(AuthContext);

  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const onSubmit = async (data) => {
    setLoading(true);
    handleLogin(data);
  };

  const handleGoToRegister = () => {
    navigate("/register");
  };

  const handleLogin = async ({ email, password }) => {
    UserService.login({ email, password })
      .then(({ data }) => {
        toast.success(`Bem-vindo(a) de volta, ${data.name.split(" ")[0]}!`);
        login(data);
        navigate("/dashboard");
      })
      .catch(({ response }) => {
        console.log(response);
        if (response?.data?.error) {
          toast.error(response.data.error);
        } else if (response?.data?.error[0]) {
          toast.error(response.data.error[0].message);
        } else {
          toast.error("Erro ao efetuar login!");
        }
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <main className="w-full h-screen flex flex-row">
      <div className="flex-1 flex items-center justify-center">
        <div className="max-w-96 w-full flex justify-center flex-col px-2">
          <img src="/logo-full.svg" alt="Logo Shave Sync" className="h-16" />
          <h1 className="font-medium text-lg text-center mt-4 leading-6">
            Gerencie eu agendamentos de forma descomplicada
          </h1>
          <p className="font-medium text-zinc-800 text-lg text-center mt-4">
            Acesse sua conta
          </p>
          <form
            className="flex flex-col gap-2 mt-4"
            onSubmit={handleSubmit(onSubmit)}
          >
            <div>
              <input
                type="email"
                placeholder="E-mail"
                className={`w-full h-12 px-4 bg-zinc-50 placeholder-zinc-800 border border-b-2 focus:border-b-primary outline-none rounded-t-md flex items-center gap-2 transition-all ${
                  errors.email
                    ? "border-red-500 outline-none"
                    : "border-zinc-300"
                }`}
                disabled={loading}
                {...register("email")}
              />
              {errors.email && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div className="mb-4">
              <input
                type="password"
                placeholder="Senha"
                className={`w-full h-12 px-4 bg-zinc-50 placeholder-zinc-800 border border-b-2 focus:border-b-primary outline-none rounded-t-md flex items-center gap-2 transition-all ${
                  errors.password
                    ? "border-red-500 outline-none"
                    : "border-zinc-300"
                }`}
                disabled={loading}
                {...register("password")}
              />
              {errors.password && (
                <p className="text-xs text-red-500 mt-1 font-medium">
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button loading={loading} type="submit">
              Entrar
            </Button>
          </form>

          <p className="font-medium text-center mt-8">
            Não tenho uma conta{" "}
            <span
              onClick={handleGoToRegister}
              className="cursor-pointer text-primary hover:opacity-80 font-medium transition-all"
            >
              Criar conta!
            </span>
          </p>
        </div>
      </div>
      <div className="flex-1 relative hidden md:block">
        <img
          src="/bg-login.jpg"
          alt="Imagem de fundo do login"
          className="w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-primary opacity-60"></div>
      </div>
    </main>
  );
}
