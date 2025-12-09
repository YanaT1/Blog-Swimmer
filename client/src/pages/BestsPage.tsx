import PersonalBests from '../components/PersonalBests';
import './stylePage.css';



function BestsPage() {
    return (
        <>
            <h2 className='title'>Personal Bests</h2>
            <div className='containerMargin'>
                <PersonalBests />
            </div>
        </>
    );
}

export default BestsPage;