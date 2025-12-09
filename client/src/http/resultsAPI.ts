import {
    $host,
    $authHost} from './index';
import {IYearsResultsStore} from '../models/storeModels/IYearsResultsStore';
import {AppRoutes} from '../models/AppRoutes';



const baseResultAdminRoute = '/results/admin-person78946';

export const resultsAPI = {
    async fetchAll(): Promise<IYearsResultsStore[]> {
        const response = await $host.get<IYearsResultsStore[]>(AppRoutes.Results);
        return response.data;
    },

     async createResult(newResult: Omit<IYearsResultsStore, 'id'>): Promise<IYearsResultsStore> {
        const response = await $authHost.post<IYearsResultsStore>(baseResultAdminRoute, newResult);
        return response.data;
    },

    async updateResult(id: number, updatedResult: Partial<IYearsResultsStore>): Promise<IYearsResultsStore> {
        const response = await $authHost.put<IYearsResultsStore>(`${baseResultAdminRoute}/${id}`, updatedResult);
        return response.data;
    },

    async deleteResult(id: number): Promise<void> {
        await $authHost.delete(`${baseResultAdminRoute}/${id}`);
    },
};
