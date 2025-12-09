import {useContext} from 'react';
import { 
    useLocation, 
    Navigate, 
    Outlet } from "react-router-dom";
import {observer} from 'mobx-react-lite';
import {Context} from '../index';
import {Role} from '../models/ERole'; 
import Loader from '../components/Loader';



//interface RequireRoleProps {
    // Нет необходимости передавать массив ролей, так как только Admin может получить доступ.
    // Но это полезно использовать если доступ необходимо предоставить нескольким ролям.
//}


const RequireRole = observer((): JSX.Element => {
    const {user} = useContext(Context);
    const location = useLocation();

    if (user.isLoading) {
        return (
            <Loader />
        );
    }
    
    if (!user._isAuth) {
        return (
            <Navigate to="/user/login" state={{ from: location }} replace />
        )
    }

    if (user._user?.role !== Role.Admin) { 
        return (
            <Navigate to='/' state={{ from: location }} replace />
        )
    }

    return (
        <div>
            <Outlet /> 
        </div>
    );
});

export default RequireRole;