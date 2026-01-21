import {IUser} from '../IUser';


export interface AuthResponse {
    accessToken: string;
    user: IUser;
    message: string;  
    success: boolean;
}