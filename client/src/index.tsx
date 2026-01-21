import React, {createContext} from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import {
  user, 
  pool_m,
  style_m, 
  personal_bests, 
  typeOfMedals, 
  years_results} from '../store/store';


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
