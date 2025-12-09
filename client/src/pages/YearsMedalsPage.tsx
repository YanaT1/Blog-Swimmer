import {
    useEffect, 
    useContext} from 'react';
import {useParams} from 'react-router-dom';
import {observer} from 'mobx-react-lite';
import {Context} from '../index';
import MedalsTable from '../components/MedalsTable';
import Loader from '../components/Loader';
import './stylePage.css';



function YearsMedalsPage() {
    const {typeOfMedals} = useContext(Context);
    const {year} = useParams<{ year: string }>();

    useEffect(() => {
        typeOfMedals.fetchMedals();
    }, [typeOfMedals]);

    const filteredMedals = typeOfMedals.medals.filter(medal => {
        return medal.medal_date.startsWith(year || '');
    });

    if (typeOfMedals.isLoading) {
        return <Loader />;
    }
    if (!filteredMedals.length) return <div>No medals found for year {year}.</div>;

    return (
        <>
            <h2 className='title'>Medals {year}
            </h2>

            <div className='containerMarginTable'>
               <MedalsTable filtered={filteredMedals} />
            </div>
        </>
    );
}

export default observer (YearsMedalsPage);

