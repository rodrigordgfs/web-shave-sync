import AxiosServices from './axios'

class UsersService extends AxiosServices {
    constructor() {
        super({
            config: {
                baseURL: import.meta.env.VITE_API_URL,
            }
        })
    }

    login(body) {
        return this.axios.post(`${this.url}/users/login`, body)
    }

    register(body) {
        return this.axios.post(`${this.url}/users/register`, body)
    }
}

export default new UsersService()
