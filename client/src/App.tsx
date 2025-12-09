import {
  useContext,
  useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Loader from './components/Loader';
import './index.css';
import {observer} from 'mobx-react-lite';
import {Context, State} from './index';



const App = observer( (): JSX.Element => {
    const {user, years_results} = useContext<State>(Context);


    useEffect(() => {
        const init = async () => {
            if (localStorage.getItem('token')) {
                await user.checkAuth();
            } else {
                user.setLoading(false);
            }

            if (years_results.availableYears.length === 0) {
                await years_results.fetchResults();
            }
        };

       init().catch(console.error);
    }, []);

    
    if (user.isLoading || years_results.isLoading) {
        return (
            <Loader />
        )
    }
  

    return (
        <Router>
            <div className='wrapper'>
                <AppRouter />
            </div>
        </Router>
    );
})

export default App;
