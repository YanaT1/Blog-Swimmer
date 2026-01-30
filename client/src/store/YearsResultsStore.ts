import {
    makeAutoObservable, 
    runInAction} from 'mobx';
import {IYearsResultsStore} from '../models/storeModels/IYearsResultsStore';
import {ResultsService} from '../services/ResultsService';


export interface IYearsResultsStoreFull {
    results: Record<string, IYearsResultsStore[]>;
    isLoading: boolean;
    fetchResults(): Promise<void>;
    addResult(result: Omit<IYearsResultsStore, 'id'>): Promise<void>;
    updateResult(id: number, updatedData: Partial<IYearsResultsStore>): Promise<void>;
    deleteResult(id: number): Promise<void>;
}

export default class YearsResultsInfo implements IYearsResultsStoreFull {
    _resultsByYear: Record<string, IYearsResultsStore[]> = {};
    isLoading: boolean = false;
    isLoaded: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }


    get allResults(): IYearsResultsStore[] {
        return Object.values(this._resultsByYear).flat();
    }

    setResultsForYear(year: string, results: IYearsResultsStore[]) {
        this._resultsByYear[year] = results;
    }

    getResultsByYear(year: string): IYearsResultsStore[] | undefined {
        return this._resultsByYear[year];
    }

    get availableYears(): string[] {
        return Object.keys(this._resultsByYear);
    }

    get results(): Record<string, IYearsResultsStore[]> {
        return this._resultsByYear;
    }

    async fetchResults() {
        if (this.isLoading) return;
        this.isLoading = true;
        try {
            const results: IYearsResultsStore[] = await ResultsService.loadAll(); 
            const grouped: Record<string, IYearsResultsStore[]> = {};

            results.forEach((res) => {
                const year = new Date(res.date).getFullYear().toString();
                if (!grouped[year]) grouped[year] = [];
                grouped[year].push(res);
            });

            runInAction(() => {
                this._resultsByYear = grouped;
                this.isLoaded = true;
            });
        } catch (e) {
            console.error('Error fetching results:', e);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async addResult(result: Omit<IYearsResultsStore, 'id'>) {
        try {
            const created = await ResultsService.addResult(result);
            const year = new Date(created.date).getFullYear().toString();

            runInAction(() => {
                if (!this._resultsByYear[year]) {
                    this._resultsByYear[year] = [];
                }
                this._resultsByYear[year].push(created);
            });
        } catch (e) {
            console.error('Error adding result:', e);
        }
    }

    async updateResult(id: number, updatedData: Partial<IYearsResultsStore>) {
        try {
            const updated = await ResultsService.editResult(id, updatedData);
            const newYear = new Date(updated.date).getFullYear().toString();

            runInAction(() => {
                for (const y in this._resultsByYear) {
                    const index = this._resultsByYear[y].findIndex((r: IYearsResultsStore) => r.id === id);
                    if (index !== -1) {
                        if (y !== newYear) {
                            this._resultsByYear[y].splice(index, 1); 
                            if (!this._resultsByYear[newYear]) this._resultsByYear[newYear] = [];
                            this._resultsByYear[newYear].push(updated);
                        } else {
                            this._resultsByYear[y][index] = updated;
                        }
                        break;
                    }
                }
            });
        } catch (e) {
            console.error('Error updating result:', e);
        }
    }

    async deleteResult(id: number) {
        try {
            await ResultsService.removeResult(id);

            runInAction(() => {
                for (const year in this._resultsByYear) {
                    this._resultsByYear[year] = this._resultsByYear[year].filter(
                        (r: IYearsResultsStore) => r.id !== id
                    );
                }
            });
        } catch (e) {
            console.error('Error deleting result:', e);
        }
    }
}
