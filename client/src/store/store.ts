import {createContext} from 'react';
import UserStore from '../store/UserStore';
import BestsStore from '../store/BestsStore';
import PoolMstore from '../store/PoolMstore';
import StyleMstore from '../store/StyleMstore';
import TypeOfMedalsStore from '../store/TypeOfMedalsStore';
import YearsResultsStore from '../store/YearsResultsStore';

export interface State {
  user: UserStore;
  pool_m: PoolMstore;
  style_m: StyleMstore;
  personal_bests: BestsStore;
  typeOfMedals: TypeOfMedalsStore;
  years_results: YearsResultsStore;
}

export const user = new UserStore();
export const pool_m = new PoolMstore();
export const style_m = new StyleMstore();
export const personal_bests = new BestsStore();
export const typeOfMedals = new TypeOfMedalsStore();
export const years_results = new YearsResultsStore();

export const Context = createContext<State>({
  user, pool_m, style_m, personal_bests, typeOfMedals, years_results})
