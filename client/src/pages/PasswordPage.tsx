import {FC} from 'react';
import {useParams} from 'react-router-dom';
import ResetPassword from '../components/forms/ResetPassword'; 
import ForgotPassword from '../components/forms/ForgotPassword';
import './stylePage.css';



const PasswordPage: FC = () => {
    const {token} = useParams<Record<string, string | undefined>>();
    const isResetPassword = token !== undefined;

    return (
        <div className='title'>
            <div className='containerMargin'>
                {isResetPassword ? (
                    <ResetPassword token={token!} />  
                ) : (
                    <ForgotPassword />
                )}
            </div>
        </div>
    );
};

export default PasswordPage;
