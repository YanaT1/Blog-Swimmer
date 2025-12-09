import {
    $host,
    $authHost} from './index';
import {ITypeOfMedalsStore} from '../models/storeModels/ITypeOfMedalsStore';
import {AppRoutes} from '../models/AppRoutes';



const baseMedalAdminRoute = '/medals/admin-person78945';

export const medalsAPI = {
    async fetchAll(): Promise<ITypeOfMedalsStore[]> {
        const response = await $host.get<ITypeOfMedalsStore[]>(AppRoutes.Medals);
        return response.data;
    },

     async createMedal(newMedal: Omit<ITypeOfMedalsStore, 'id'>): Promise<ITypeOfMedalsStore> {
        const response = await $authHost.post<ITypeOfMedalsStore>(baseMedalAdminRoute, newMedal);
        return response.data;
    },

    async updateMedal(id: number, updatedMedal: Partial<ITypeOfMedalsStore>): Promise<ITypeOfMedalsStore> {
        const response = await $authHost.put<ITypeOfMedalsStore>(`${baseMedalAdminRoute}/${id}`, updatedMedal);
        return response.data;
    },

    async deleteMedal(id: number): Promise<void> {
        await $authHost.delete(`${baseMedalAdminRoute}/${id}`);
    },
};
