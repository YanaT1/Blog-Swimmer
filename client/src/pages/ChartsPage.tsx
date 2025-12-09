import './stylePage.css';
import Dashboard from '../components/chart/Dashboard';
import DashboardFina from '../components/chart/DashboardFina';



function ChartsPage() {
    return (
        <>
            <div className='titleChart'></div>
            <div className='containerMargin mb=5'>
                <DashboardFina />
                <Dashboard />
            </div>
        </>
    )
}

export default ChartsPage;