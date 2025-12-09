import { 
    useContext, 
    useState} from 'react';
import {
    Link,
    useNavigate,
    useLocation} from 'react-router-dom';
import {
    Nav,
    Navbar,
    Container} from 'react-bootstrap';
import {IUser} from '../models/IUser';
import {Role} from '../models/ERole';
import {Context} from '../index';
import ScrollToTop from './ScrollToTop';
import '../css/navbar.css';
import {observer} from 'mobx-react-lite';
import {AppRoutes} from '../models/AppRoutes';



const NavBar = observer((): JSX.Element => {
    const {user} = useContext(Context);
    const navigate = useNavigate();
    const location = useLocation();
    const isHomePage = location.pathname === AppRoutes.Home;

    const [expanded, setExpanded] = useState(false);

    const logOut = () => {
        user.setUser({} as IUser);
        user.setAuth(false);
        navigate('/');
    };

    const handleNavLinkClick = () => {
        if (expanded) {
            setExpanded(false); // Закрыть меню
        }
    };


    return (
        <div>
            <ScrollToTop />
            <Navbar
                collapseOnSelect
                expand='md'
                data-bs-theme='dark'
                className={`Navbar ${isHomePage ? 'containerNavbarHome' : 'containerNavbar'}`}
                sticky='top'
                expanded={expanded}
            >
                <Container fluid>
                    <Navbar.Brand 
                        className='navbarBrand' 
                        href={AppRoutes.Home}>
                            IVAN
                    </Navbar.Brand>
                    <Navbar.Toggle
                        aria-controls='responsive-navbar-nav'
                        className='burgerStyle'
                        onClick={() => setExpanded(!expanded)}
                    />
                    <Navbar.Collapse id='responsive-navbar-nav' style={{marginLeft: '10%'}}>
                        <Nav className='me-auto'>
                            <Nav.Link
                                className='navbar'
                                as={Link} to={AppRoutes.PersonalBests}
                                onClick={handleNavLinkClick} 
                            >
                                Bests
                            </Nav.Link>
                            <Nav.Link
                                className='navbar'
                                as={Link} to={AppRoutes.Results}
                                onClick={handleNavLinkClick}
                            >
                                Results
                            </Nav.Link>
                            <Nav.Link
                                className='navbar'
                                as={Link} to={AppRoutes.Medals}
                                onClick={handleNavLinkClick}
                            >
                                Medals
                            </Nav.Link>
                            <Nav.Link
                                className='navbar'
                                as={Link} to={AppRoutes.Charts}
                                onClick={handleNavLinkClick}
                            >
                                Charts
                            </Nav.Link>
                            <Nav.Link
                                className='navbar'
                                as={Link} to={AppRoutes.Contact}
                                onClick={handleNavLinkClick}
                            >
                                Contact
                            </Nav.Link>
                        </Nav>

                        <div className='containerButton'>
                            {user.isAuth ? (
                                <Nav className='ml-auto'>
                                    {user._user?.role === Role.Admin && (
                                        <Nav.Link
                                            as={Link} to={AppRoutes.Admin}
                                            className='navbar' style={{fontSize:11}}
                                            onClick={handleNavLinkClick} 
                                        >
                                            Admin
                                        </Nav.Link>
                                    )}
                                    <Nav.Link
                                        as={Link} to='AppRoutes.Home'
                                        className='navbar' style={{fontSize:11}}
                                        onClick={() => {
                                            logOut();
                                            handleNavLinkClick(); // Закрыть меню при выходе
                                        }}
                                    >
                                        Logout
                                    </Nav.Link>
                                </Nav>
                            ) : (
                                <Nav className='ml-auto'>
                                    <Nav.Link
                                        as={Link} to={AppRoutes.Login}
                                        className='navbar' style={{fontSize:11}}
                                        onClick={handleNavLinkClick} // Закрыть меню при клике
                                    >
                                        Login
                                    </Nav.Link>
                                </Nav>
                            )}
                        </div>
                    </Navbar.Collapse>
                </Container>
            </Navbar>
        </div>
    );
});

export default NavBar;
