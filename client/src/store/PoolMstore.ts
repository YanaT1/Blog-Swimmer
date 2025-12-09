import {makeAutoObservable} from 'mobx';
import {IPoolMstore} from '../models/storeModels/IPoolMstore';

export default class PoolMinfo {
    _pools: IPoolMstore[];

    constructor() {
        this._pools = [
            {
                id: 1, 
                typePool:'25m'
            },
            {
                id: 2, 
                typePool:'50m'
            }
        ];
        makeAutoObservable(this)
    }

    setPools(pools: IPoolMstore[]): void {
        this._pools = pools
    }

    get pools(): IPoolMstore[] {
        return this._pools
    }
}