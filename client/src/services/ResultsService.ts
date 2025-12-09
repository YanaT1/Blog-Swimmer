import {resultsAPI} from '../http/resultsAPI';
import {IYearsResultsStore} from '../models/storeModels/IYearsResultsStore';

export class ResultsService {
    static async loadAll(): Promise<IYearsResultsStore[]> {
        const data = await resultsAPI.fetchAll();
        console.log('resultsAPI.loadAll data:', data);
        return data;
    }

    static async addResult(newResult: Omit<IYearsResultsStore, 'id'>): Promise<IYearsResultsStore> {
        return resultsAPI.createResult(newResult);
    }

    static async editResult(id: number, updatedResult: Partial<IYearsResultsStore>): Promise<IYearsResultsStore> {
        console.log('>>> Edit result', id, updatedResult);
        return resultsAPI.updateResult(id, updatedResult);
    }

    static async removeResult(id: number): Promise<void> {
        console.log('>>> Delete result', id); 
        return resultsAPI.deleteResult(id);
    }
}
