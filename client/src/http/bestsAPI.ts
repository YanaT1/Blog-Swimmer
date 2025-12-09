import {
    $host,
    $authHost} from './index';
import {IBestsStore} from '../models/storeModels/IBestsStore';
import {AppRoutes} from '../models/AppRoutes';



const baseAdminRoute = '/personal-bests/admin-person78944';

export const bestsAPI = {
    async fetchAll(): Promise<IBestsStore[]> {
        const response = await $host.get<IBestsStore[]>(AppRoutes.PersonalBests);
        return response.data;
    },

     async createBest(newBest: Omit<IBestsStore, 'id'>): Promise<IBestsStore> {
        const response = await $authHost.post<IBestsStore>(baseAdminRoute, newBest);
        return response.data;
    },

    async updateBest(id: number, updatedBest: Partial<IBestsStore>): Promise<IBestsStore> {
        const response = await $authHost.put<IBestsStore>(`${baseAdminRoute}/${id}`, updatedBest);
        return response.data;
    },

    async deleteBest(id: number): Promise<void> {
        await $authHost.delete(`${baseAdminRoute}/${id}`);
    },
};
