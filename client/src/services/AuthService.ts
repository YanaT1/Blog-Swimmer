import {AxiosResponse} from 'axios';
import {$host, $authHost} from '../http';
import {AuthResponse} from '../models/response/AuthResponse';
import {Role} from '../models/ERole';

class AuthService {
    static async login(email: string, password: string)
    : Promise<AxiosResponse<AuthResponse>> {
        return $host.post<AuthResponse>('/user/login', { email, password });
    }

    static async registration(email: string, password: string, role: Role)
    : Promise<AxiosResponse<AuthResponse>> {
        return $host.post<AuthResponse>('/user/registration', { email, password, role });
    }

    static async logout()
    : Promise<void> {
        await $authHost.post('/user/logout');
    }

    static async checkAuth()
    : Promise<AxiosResponse<AuthResponse>> {
        return $authHost.get<AuthResponse>('/user/auth');
    }

    static async forgotPassword(email: string)
    : Promise<AxiosResponse<AuthResponse>> {
        return $host.post<AuthResponse>('/user/forgot-password', {email});
    }

    static async resetPassword(token: string, password: string, matchPwd: string)
    : Promise<AxiosResponse<AuthResponse>> {
        return $host.post<AuthResponse>(`/user/reset-password/${token}`, {password, matchPwd});
    }
}

export default AuthService;
