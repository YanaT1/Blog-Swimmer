import {FC} from 'react';
import LoginForm from '../components/forms/LoginForm';
import './stylePage.css';



const LoginFormPage: FC = () => {
    return (
        <div className='title'>
            <div className='containerMargin'>
                <LoginForm />
            </div>
        </div>
    )
}

export default LoginFormPage;