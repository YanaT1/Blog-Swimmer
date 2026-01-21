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
    accessToken: string | null = null;

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
    
    setAuthData(user: IUser | null, token: string | null) {
        this.user = user;
        this.accessToken = token;
        this.isAuth = !!user;
        this.isAdmin = user?.role === Role.Admin;
    }

    async login(email: string, password: string) {
       try {
            const response = await AuthService.login(email, password);
            this.setAuthData(response.data.user, response.data.accessToken);
        } catch (e) {
            this.handleError(e, 'Login error');
            throw e;
        }
    }

    async registration(email: string, password: string, role: Role) {
        try {
                const response = await AuthService.registration(email, password, role);
                this.setAuthData(response.data.user, response.data.accessToken);
                this.setAuth(true);
                alert('Thank you for signing up. Please check your email. See you soon, Ivan.')
            } catch (e) {
                this.handleError(e, 'Registration error');
                throw e;
            }
        }

    async logout() {
        try {
            await AuthService.logout();
        } finally {
            this.setAuthData(null, null);
        }
    }
        
        
    async checkAuth() {
        this.setLoading(true);
        try {
            const response = await AuthService.checkAuth(); 
            this.setAuthData(response.data.user, response.data.accessToken);
            return response.data.user;
        } catch (e) {
            this.setAuthData(null, null);
            return null;
            } finally {
                this.setLoading(false);
            }
        }

        private handleError(e: unknown, message: string) {
            if (axios.isAxiosError(e)) {
                console.error(`${message}:`, e.response?.data || e.message);
            } else {
                console.error(`Unknown ${message}:`, e);
            }
        }
    }

