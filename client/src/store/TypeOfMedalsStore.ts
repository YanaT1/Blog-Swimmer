import {
    makeAutoObservable, 
    runInAction} from 'mobx';
import {ITypeOfMedalsStore} from '../models/storeModels/ITypeOfMedalsStore';
import {MedalsService} from '../services/MedalsService';



export interface ITypeOfMedalsStoreFull {
    medals: Record<string, ITypeOfMedalsStore[]>;
    availableYears: string[];
    isLoading: boolean;
    fetchMedals(): Promise<void>;
    addMedal(medal: Omit<ITypeOfMedalsStore, 'id'>): Promise<void>;
    updateMedal(id: number, updatedData: Partial<ITypeOfMedalsStore>): Promise<void>;
    deleteMedal(id: number): Promise<void>;
}

export default class TypeOfMedalsInfo implements ITypeOfMedalsStoreFull {
    _typeOfMedals: Record<string, ITypeOfMedalsStore[]> = {};
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

     get allMedals(): ITypeOfMedalsStore[] {
        return Object.values(this._typeOfMedals).flat();
    }

    get medals(): Record<string, ITypeOfMedalsStore[]> {
        return this._typeOfMedals;
    }

    get availableYears(): string[] {
        return Object.keys(this._typeOfMedals).sort((a, b) => Number(b) - Number(a));
    }

    async fetchMedals() {
        if (this.isLoading) return;
        this.isLoading = true;
        try {
            const data = await MedalsService.loadAll();
            const grouped: Record<string, ITypeOfMedalsStore[]> = {};

            data.forEach((medal) => {
                const year = new Date(medal.medal_date).getFullYear().toString();
                if (!grouped[year]) grouped[year] = [];
                grouped[year].push(medal);
            });

            runInAction(() => {
                this._typeOfMedals = grouped;
            });
        } catch (e) {
            console.error('Error fetching medals:', e);
        } finally {
            runInAction(() => {
                this.isLoading = false;
            });
        }
    }

    async addMedal(medal: Omit<ITypeOfMedalsStore, 'id'>) {
        try {
            const created = await MedalsService.addMedal(medal);
            const year = new Date(created.medal_date).getFullYear().toString();
            runInAction(() => {
                if (!this._typeOfMedals[year]) this._typeOfMedals[year] = [];
                this._typeOfMedals[year].push(created);
            });
        } catch (e) {
            console.error('Error adding medal:', e);
        }
    }

    async updateMedal(id: number, updatedData: Partial<ITypeOfMedalsStore>) {
        try {
            const updated = await MedalsService.editMedal(id, updatedData);
            const newYear = new Date(updated.medal_date).getFullYear().toString();

            runInAction(() => {
                for (const year in this._typeOfMedals) {
                    const index = this._typeOfMedals[year].findIndex(m => m.id === id);
                    if (index !== -1) {
                        if (year !== newYear) {
                            this._typeOfMedals[year].splice(index, 1);
                            if (!this._typeOfMedals[newYear]) this._typeOfMedals[newYear] = [];
                            this._typeOfMedals[newYear].push(updated);
                        } else {
                            this._typeOfMedals[year][index] = updated;
                        }
                        break;
                    }
                }
            });
        } catch (e) {
            console.error('Error updating medal:', e);
        }
    }

    async deleteMedal(id: number) {
        try {
            await MedalsService.removeMedal(id);
            runInAction(() => {
                for (const year in this._typeOfMedals) {
                    this._typeOfMedals[year] = this._typeOfMedals[year].filter(m => m.id !== id);
                }
            });
        } catch (e) {
            console.error('Error deleting medal:', e);
        }
    }
}
