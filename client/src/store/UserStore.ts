import {IUser} from '../models/IUser';
import {Role} from '../models/ERole'; 
import AuthService from '../services/AuthService';
import {AuthResponse} from '../models/response/AuthResponse';
import {makeAutoObservable} from 'mobx';
import axios from 'axios';



export default class UserStore {
    user: IUser | null = null;
    isAuth = false;
    isAdmin = false;
    isLoading = true;

    constructor() {
        makeAutoObservable(this);
    }

    setAuth(bool: boolean) {
        this.isAuth = bool;
    }

    setUser(user: IUser | null) {
        this.user = user;
        this.isAdmin = user?.role === Role.Admin;
    }

    setLoading(bool: boolean) {
        this.isLoading = bool;
    }

    get _isAuth() {
        return this.isAuth
    }
    get _user() {
        return this.user
    }
    

    async login(email: string, password: string) {
       try {
            const response = await AuthService.login(email, password) as { data: AuthResponse };
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.error('Login error:', e.response?.data || e.message);
            } else {
                console.error('Unknown error authentication:', e);
            }
            throw e;
        }
    }

    async registration(email: string, password: string, role: Role) {
        try {
                const response = await AuthService.registration(email, password, role);
                localStorage.setItem('token', response.data.accessToken);
                this.setAuth(true);
                this.setUser(response.data.user);
                alert('Thank you for signing up. Please check your email. See you soon, Ivan.')
            } catch (e: unknown) {
                if (axios.isAxiosError(e)) {
                    console.error('Registration error:', e.response?.data || e.message);
                } else {
                  console.error('Unknown registration error:', e);
                }
                throw e;
            }
        }

    async logout() {
        try {
            await AuthService.logout();
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                console.log('Logout error:', e.response?.data || e.message);
            } else {
                console.log('Unknown logout error:', e);
            }
        } finally {
            localStorage.removeItem('token');
            this.setAuth(false);
            this.setUser(null);
        }
    }
        
        
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await axios.get<AuthResponse>(`${process.env.REACT_APP_API_URL}/user/auth`, 
                             {withCredentials: true});
            //console.log(response);
            localStorage.setItem('token', response.data.accessToken);
            this.setAuth(true);
            this.setUser(response.data.user);
            return response.data.user;
        } catch (e: unknown) {
            if (axios.isAxiosError(e)) {
                if (e.response?.status === 401) {
                    console.log('User is not login');
                } else {
                    console.error('Error authentication:', e.response?.data || e.message);
                }
            } else {
                console.error('Unknown error authentication:', e);
            }
            this.setAuth(false);
            this.setUser(null);
            return null; 
            } finally {
                this.setLoading(false);
            }
        }
    }

