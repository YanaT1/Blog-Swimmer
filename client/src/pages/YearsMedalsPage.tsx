import {
    useEffect, 
    useContext} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Context} from '../store/store';
import MedalsTable from '../components/MedalsTable';
import Loader from '../components/Loader';
import './stylePage.css';



function YearsMedalsPage() {
    const {typeOfMedals} = useContext(Context);
    const {year} = useParams<{year: string}>();

    useEffect(() => {
        typeOfMedals.fetchMedals();
    }, [typeOfMedals, year]);

    const sortedYears = useMemo(() => {
        return Object.keys(typeOfMedals.medals)
            .map(Number)                 
            .sort((a, b) => b - a)       
            .map(String);                 
    }, [typeOfMedals.medals]);

    const filteredMedals = typeOfMedals.medals[year || ''] || [];

    if (typeOfMedals.isLoading) {
        return <Loader />;
    }
    if (!filteredMedals.length) {
        return ( 
            <h2 className='text-center mt-5' style={{ color:'rgba(3, 51, 109, 0.6)'}}>
            No medals found for year {year}.
            </h2>
        );
    }

    return (
        <>
            <h2 className='title'>Medals {year}
            </h2>

            <div className='containerMarginTable'>
                {sortedYears.map(
                   <MedalsTable />
                )}
            </div>
        </>
    );
}

export default observer (YearsMedalsPage);

