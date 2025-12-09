import {Role} from './ERole';

export interface IUser {
    id: number;
    email: string;
    isActivated: boolean;
    role: Role;
}