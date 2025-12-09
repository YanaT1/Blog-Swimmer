import {makeAutoObservable} from 'mobx';
import {IStyleMstore} from '../models/storeModels/IStyleMstore';

export default class StyleMinfo {
    _styles: IStyleMstore[];

    constructor() {
        this._styles = [
            {
                id: 1, 
                name:'50m Butterfly'
            },
            {
                id: 2, 
                name:'100m Butterfly'
            },
            {
                id: 3, 
                name:'200m Butterfly'
            },
            {
                id: 4, 
                name:'50m Freestyle'
            },
            {
                id: 5, 
                name:'100m Freestyle'
            },
            {
                id: 6, 
                name:'200m Freestyle'
            },
            {
                id: 7,
                name: '400m Freestyle'
            },
            {
                id: 8,
                name: '800m Freestyle'
            },
            {
                id: 9,
                name: '1500m Freestyle'
            },
            {
                id: 10, 
                name:'50m Backstroke'
            },
            {
                id: 11,
                name:'100m Backstroke'
            },
            {
                id: 12,
                name:'200m Backstroke'
            },
            {
                id: 13,
                name: '50m Breaststroke'
            },
            {
                id: 14,
                name: '100m Breaststroke'
            },
            {
                id: 15,
                name: '200m Breaststroke'
            },
            {
                id: 16,
                name: '100m Medley'
            },
            {
                id: 17,
                name: '200m Medley'
            },
            {
                id: 18,
                name: '400m Medley'
            },
        ];
        makeAutoObservable(this)
    }

    setStyles(styles: IStyleMstore[]): void {
        this._styles = styles
    }

    get styles(): IStyleMstore[] {
        return this._styles
    }
}