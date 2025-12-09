import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import UserStore from './store/UserStore';
import BestsStore from './store/BestsStore';
import PoolMstore from './store/PoolMstore';
import StyleMstore from './store/StyleMstore';
import TypeOfMedalsStore from './store/TypeOfMedalsStore';
import YearsResultsStore from './store/YearsResultsStore';



export interface State {
  user: UserStore;
  pool_m: PoolMstore;
  style_m: StyleMstore;
  personal_bests: BestsStore;
  typeOfMedals: TypeOfMedalsStore;
  years_results: YearsResultsStore;
}

const user = new UserStore();
const pool_m = new PoolMstore();
const style_m = new StyleMstore();
const personal_bests = new BestsStore();
const typeOfMedals = new TypeOfMedalsStore();
const years_results = new YearsResultsStore();

export const Context = createContext<State>({
  user, pool_m, style_m, personal_bests, typeOfMedals, years_results})

const root = ReactDOM.createRoot(document.getElementById('root')!);
root.render(
  <React.StrictMode>
    <Context.Provider 
        value = {{user, pool_m, style_m, personal_bests, typeOfMedals, years_results}}
    >
      <App />
    </Context.Provider>
  </React.StrictMode>
);
reportWebVitals();
