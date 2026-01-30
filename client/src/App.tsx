import {
  useContext,
  useEffect} from 'react';
import {BrowserRouter as Router} from 'react-router-dom';
import AppRouter from './components/AppRouter';
import Cookie from './components/Cookie';
import Loader from './components/Loader';
import './index.css';
import {observer} from 'mobx-react-lite';
import {Context, State} from './store/store';



const App = observer( (): JSX.Element => {
    const {user, years_results} = useContext<State>(Context);


    useEffect(() => {
        const init = async () => {
            try {
                await user.checkAuth();
            } catch (e) {
                console.error('Initialization error:', e);
            } finally {
                if (years_results.availableYears.length === 0) {
                    await years_results.fetchResults();
                }
                user.setLoading(false);
            }
        };
        init();
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
                <Cookie />
            </div>
        </Router>
    );
})

export default App;
