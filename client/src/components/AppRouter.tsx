import {
    Routes, 
    Route, 
    Navigate} from 'react-router-dom';
 import Layout from '../components/Layout';
 import RequireRole from '../components/RequireRole';
 import {AppRoutes} from '../models/AppRoutes';
 
 import AdminPage from '../pages/AdminPage';
 import AdminBestsPanel from '../components/admin/AdminBestsPanel';
 import AdminMedalsPanel from '../components/admin/AdminMedalsPanel';
 import AdminResultsPanel from '../components/admin/AdminResultsPanel';
 import LoginFormPage from '../pages/LoginFormPage';
 import PasswordPage from '../pages/PasswordPage';
 import IvanPage from '../pages/IvanPage';
 import BestsPage from '../pages/BestsPage';
 import ResultsPage from '../pages/ResultsPage';
 import YearsResultsPage from '../pages/YearsResultsPage';
 import MedalsPage from '../pages/MedalsPage';
 import YearsMedalsPage from '../pages/YearsMedalsPage';
 import ChartsPage from '../pages/ChartsPage';
 import ContactPage from '../pages/ContactPage';
 
 

 const AppRouter = (): JSX.Element => {
     return (
         <>
           <Routes>  
               <Route path={AppRoutes.Home} 
                      element={<Layout />}>

                  <Route element={<RequireRole />}>       
                     <Route path = {AppRoutes.Admin}
                            element = {<AdminPage />} 
                     />
                     <Route path = {AppRoutes.AdminBestsPanel}
                            element = {<AdminBestsPanel />}
                     />
                     <Route path = {AppRoutes.AdminMedalsPanel}
                            element = {<AdminMedalsPanel />}
                     />
                     <Route path = {AppRoutes.AdminResultsPanel}
                            element = {<AdminResultsPanel/>}
                     />
                  </Route>
            
 
                  <Route path = {AppRoutes.Login}
                         element = {<LoginFormPage />}
                  />

                  <Route path = {AppRoutes.ForgotPassword}
                         element = {<PasswordPage />}
                  />

                  <Route path = {AppRoutes.ResetPassword}
                         element = {<PasswordPage />}
                  />

                  <Route index
                         element = {<IvanPage />}
                  />
                  <Route path = {AppRoutes.PersonalBests}
                         element = {<BestsPage />}
                  />
                  <Route path = {AppRoutes.Results}
                         element = {<ResultsPage />}
                  />
                  <Route path = {AppRoutes.Medals}
                         element = {<MedalsPage />}
                  />
                  <Route path = {AppRoutes.Charts}
                         element = {<ChartsPage />}
                  />
                  <Route path = {AppRoutes.Contact}
                         element = {<ContactPage />}
                  />

                  <Route path={AppRoutes.YearsResults} 
                         element={<YearsResultsPage />} 
                  />   

                  <Route path = {AppRoutes.YearsMedals}
                         element = {<YearsMedalsPage />}
                  />
             
                  <Route path='*' 
                         element={<Navigate replace to='/' />} 
                  />
               </Route>
            </Routes>
         </>
     );
 }
 
 export default AppRouter;