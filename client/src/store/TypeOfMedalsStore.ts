import {
    makeAutoObservable, 
    runInAction} from 'mobx';
import {ITypeOfMedalsStore} from '../models/storeModels/ITypeOfMedalsStore';
import {MedalsService} from '../services/MedalsService';



export interface ITypeOfMedalsStoreFull {
    medals: ITypeOfMedalsStore[];
    isLoading: boolean;
    fetchMedals(): Promise<void>;
    addMedal(medal: Omit<ITypeOfMedalsStore, 'id'>): Promise<void>;
    updateMedal(id: number, updatedData: Partial<ITypeOfMedalsStore>): Promise<void>;
    deleteMedal(id: number): Promise<void>;
}

export default class TypeOfMedalsInfo implements ITypeOfMedalsStoreFull {
    _typeOfMedals: ITypeOfMedalsStore[] = [];
    isLoading: boolean = false;

    constructor() {
        makeAutoObservable(this);
    }

    get medals(): ITypeOfMedalsStore[] {
        return this._typeOfMedals;
    }

    async fetchMedals() {
        this.isLoading = true;
        try {
            const medals = await MedalsService.loadAll();
            runInAction(() => {
                this._typeOfMedals = medals;
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
            console.log('Sending a request to create:', medal);
            const created = await MedalsService.addMedal(medal);
            runInAction(() => {
                this._typeOfMedals.push(created);
            });
        } catch (e) {
            console.error('Error adding medal:', e);
        }
    }

    async updateMedal(id: number, updatedData: Partial<ITypeOfMedalsStore>) {
        try {
            const updated = await MedalsService.editMedal(id, updatedData);
            runInAction(() => {
                this._typeOfMedals = this._typeOfMedals.map(b =>
                    b.id === id ? updated : b
                );
            });
        } catch (e) {
            console.error('Error updating medal:', e);
        }
    }

    async deleteMedal(id: number) {
        try {
            await MedalsService.removeMedal(id);
            runInAction(() => {
                this._typeOfMedals = this._typeOfMedals.filter(b => b.id !== id);
            });
        } catch (e) {
            console.error('Error deleting medal:', e);
        }
    }
}
