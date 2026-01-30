import {resultsAPI} from '../http/resultsAPI';
import {IYearsResultsStore} from '../models/storeModels/IYearsResultsStore';

export class ResultsService {
    static async loadAll(): Promise<IYearsResultsStore[]> {
        const data = await resultsAPI.fetchAll();
        return data;
    }

    static async addResult(newResult: Omit<IYearsResultsStore, 'id'>): Promise<IYearsResultsStore> {
        return resultsAPI.createResult(newResult);
    }

    static async editResult(id: number, updatedResult: Partial<IYearsResultsStore>): Promise<IYearsResultsStore> {
        return resultsAPI.updateResult(id, updatedResult);
    }

    static async removeResult(id: number): Promise<void> { 
        return resultsAPI.deleteResult(id);
    }
}
