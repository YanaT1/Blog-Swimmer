import {bestsAPI} from '../http/bestsAPI';
import {IBestsStore} from '../models/storeModels/IBestsStore';

export class BestsService {
    static async loadAll(): Promise<IBestsStore[]> {
        return bestsAPI.fetchAll();
    }

    static async addBest(newBest: Omit<IBestsStore, 'id'>): Promise<IBestsStore> {
        return bestsAPI.createBest(newBest);
    }

    static async editBest(id: number, updatedBest: Partial<IBestsStore>): Promise<IBestsStore> {
        console.log('>>> Edit best', id, updatedBest);
        return bestsAPI.updateBest(id, updatedBest);
    }

    static async removeBest(id: number): Promise<void> {
        console.log('>>> Delete best', id); 
        return bestsAPI.deleteBest(id);
    }
}
