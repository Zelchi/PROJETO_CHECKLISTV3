import Cookies from "js-cookie";
import axios from "axios";

// Definição dos endpoints da API
export const ENDPOINT = {
    BACKEND_ADDRESS: 'http://localhost:8000/api',

    // AUTH REGION
    AUTH_REGISTER_CODE_SEND: '/authentication/register/send-code/',
    AUTH_REGISTER_CODE_VERIFY: '/authentication/register/verify-code/',
    AUTH_REGISTER: '/authentication/register/complete/',
    AUTH_LOGIN: '/authentication/login/',
    AUTH_ACCOUNT: '/users',
    AUTH_RECOVER: '/authentication/forgot-password/',
    AUTH_RECOVER_COMFIRM: '/authentication/verify-code/',
    AUTH_SWITCH_PASSWORD: '/authentication/reset-password/',

    TASK_CRUD: '/tasks',
    DASHBOARD: '/dashboard',
}

// Classe estática para manipulação de cookies
export class Coockie {
    public static setToken = (token: string) => Cookies.set("token", token);
    public static getToken = () => Cookies.get("token");
    public static removeToken = () => Cookies.remove("token");
}

// Classe para manipulação de requisições API utilizando o Axios.
// Ela coloca o token de autenticação em cada requisição, automaticamente.
class API {
    private address = `${ENDPOINT.BACKEND_ADDRESS}`;
    private route = axios.create({ baseURL: `${this.address}` });

    public Auth = async (): Promise<Boolean> => {
        const token = Coockie.getToken();
        this.route.defaults.headers.common["Authorization"] = `Bearer ${token}`;
        if (token) {
            try {
                const { status } = await this.route.get(`${this.address}/account`);
                if (status === 200) {
                    return true;
                }
            } catch (error) {
                Coockie.removeToken();
                return false;
            }
        }
        return false;
    };

    public GET = async (path: string) => {
        if (Coockie.getToken()) {
            this.route.defaults.headers.common["Authorization"] = `Bearer ${Coockie.getToken()}`;
        }
        const res = await this.route.get(path);
        return { data: res.data, status: res.status };
    };

    public POST = async (path: string, data: object) => {
        if (Coockie.getToken()) {
            this.route.defaults.headers.common["Authorization"] = `Bearer ${Coockie.getToken()}`;
        }
        const res = await this.route.post(path, data);
        return { data: res.data, status: res.status };
    };

    public PUT = async (path: string, data: object) => {
        if (Coockie.getToken()) {
            this.route.defaults.headers.common["Authorization"] = `Bearer ${Coockie.getToken()}`;
        }
        const res = await this.route.put(path, data);
        return { data: res.data, status: res.status };
    };

    public PATCH = async (path: string, data: object) => {
        if (Coockie.getToken()) {
            this.route.defaults.headers.common["Authorization"] = `Bearer ${Coockie.getToken()}`;
        }
        const res = await this.route.patch(path, data);
        return { data: res.data, status: res.status };
    };

    public DELETE = async (path: string) => {
        if (Coockie.getToken()) {
            this.route.defaults.headers.common["Authorization"] = `Bearer ${Coockie.getToken()}`;
        }
        const res = await this.route.delete(path);
        return { data: res.data, status: res.status };
    };
}

export default new API();