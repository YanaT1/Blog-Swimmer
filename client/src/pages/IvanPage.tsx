import Header from '../components/Header';
import HomePersonalBests from '../components/HomePersonalBests';
import HomeResults from '../components/HomeResults';
import Ivan from '../photos/Ivan.png';
import './stylePage.css';



function IvanPage() {
    return (
        <>
            <Header />

            <div className='text-center'>
                <h2 className='titleHome'>Dive Into My<br />Swimming Passion
                </h2>

                <img src={Ivan}
                     alt='Ivan'
                     style={{width:'60%', height:'60%',
                            margin:'5% 5%'
                     }}
                />
            
                <div className='containerMargin'>
                    <HomePersonalBests />
                    <HomeResults />
                </div>
            </div>
        </>

        
    )
}

export default IvanPage;