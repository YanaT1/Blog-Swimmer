import {medalsAPI} from '../http/medalsAPI';
import {ITypeOfMedalsStore} from '../models/storeModels/ITypeOfMedalsStore';

export class MedalsService {
    static async loadAll(): Promise<ITypeOfMedalsStore[]> {
        return medalsAPI.fetchAll();
    }

    static async addMedal(newMedal: Omit<ITypeOfMedalsStore, 'id'>): Promise<ITypeOfMedalsStore> {
        return medalsAPI.createMedal(newMedal);
    }

    static async editMedal(id: number, updatedMedal: Partial<ITypeOfMedalsStore>): Promise<ITypeOfMedalsStore> {
        console.log('>>> Edit best', id, updatedMedal);
        return medalsAPI.updateMedal(id, updatedMedal);
    }

    static async removeMedal(id: number): Promise<void> {
        console.log('>>> Delete medal', id); 
        return medalsAPI.deleteMedal(id);
    }
}
