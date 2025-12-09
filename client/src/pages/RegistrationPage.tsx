import {FC} from 'react';
import RegistrationForm from '../components/forms/RegistrationForm';
import './stylePage.css';



const RegistrationPage: FC = () => {    
        return (
            <div className='title'>
                <div className='containerMargin'>
                    <RegistrationForm />
                </div>
            </div>
        )
}

export default RegistrationPage;