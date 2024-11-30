import { Outlet } from "react-router-dom";
import NavBar from "../../components/Navbar";

export default function AuthLayout() {
  return (
    <div className="h-screen flex flex-col">
      <NavBar />
      <div className="flex-1 flex justify-center  bg-zinc-50">
        <div className="w-full max-w-[1200px] bg-white p-4">
          <Outlet />
        </div>
      </div>
    </div>
  );
}
