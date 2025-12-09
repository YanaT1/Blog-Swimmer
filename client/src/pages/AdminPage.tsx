import {useNavigate} from 'react-router-dom';
import {
    Container,
    Button} from 'react-bootstrap';
import Greetings from '../components/admin/Greetings';
import {AppRoutes} from '../models/AppRoutes';
import './stylePage.css';



const AdminPage = () => {
    const navigate = useNavigate();

    return (
        <div className='title'>
            <Container className='d-flex flex-column containerMargin'>
                <Greetings />
                
                <Button type='button'
                        variant='outline-primary' 
                        className='mt-4 p-2' 
                        style={{width: '50%', borderRadius: 15}}
                        onClick={() => navigate(AppRoutes.AdminBestsPanel)}
                >Bests Panel
                </Button>

                <Button type='button'
                        variant='outline-primary' 
                        className='mt-4 p-2' 
                        style={{width: '50%', borderRadius: 15}}
                        onClick={() => navigate(AppRoutes.AdminMedalsPanel)}
                >Medals Panel
                </Button>

                <Button type='button'
                        variant='outline-primary' 
                        className='mt-4 p-2' 
                        style={{width: '50%', borderRadius: 15}}
                        onClick={() => navigate(AppRoutes.AdminResultsPanel)}
                >Results Panel
                </Button>
             </Container>
        </div>
    )
}

export default AdminPage;