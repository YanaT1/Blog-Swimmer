import {
    makeAutoObservable, 
    runInAction} from 'mobx';
import {IBestsStore} from '../models/storeModels/IBestsStore';
import {BestsService} from '../services/BestsService';



export interface IBestsStoreFull {
    personalBests: IBestsStore[];
    isLoading: boolean;
    fetchBests(): Promise<void>;
    addBest(best: Omit<IBestsStore, 'id'>): Promise<void>;
    updateBest(id: number, updatedData: Partial<IBestsStore>): Promise<void>;
    deleteBest(id: number): Promise<void>;
}

export default class BestsStore implements IBestsStoreFull {
    _personalBests: IBestsStore[] = [];
    isLoading = false;

    constructor() {
        makeAutoObservable(this);
    }

    get personalBests() {
        return this._personalBests;
    }

    async fetchBests() {
        this.isLoading = true;
        try {
            const bests = await BestsService.loadAll();
            runInAction(() => {
                this._personalBests = bests;
            });
        } catch (e) {
            console.error('Error fetching bests:', e);
        } finally {
        runInAction(() => {
            this.isLoading = false;
        });
      }
    }

    async addBest(best: Omit<IBestsStore, 'id'>) {
        try {
            console.log('Sending a request to create:', best);
            const created = await BestsService.addBest(best);
            runInAction(() => {
                this._personalBests.push(created);
            });
        } catch (e) {
            console.error('Error adding best:', e);
        }
    }

    async updateBest(id: number, updatedData: Partial<IBestsStore>) {
        try {
            const updated = await BestsService.editBest(id, updatedData);
            runInAction(() => {
                this._personalBests = this._personalBests.map(b =>
                    b.id === id ? updated : b
                );
            });
        } catch (e) {
            console.error('Error updating best:', e);
        }
    }

    async deleteBest(id: number) {
        try {
            await BestsService.removeBest(id);
            runInAction(() => {
                this._personalBests = this._personalBests.filter(b => b.id !== id);
            });
        } catch (e) {
            console.error('Error deleting best:', e);
        }
    }
}
