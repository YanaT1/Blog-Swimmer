import {Outlet} from 'react-router-dom';
import NavBar from './NavBar';   
import Footer from './Footer';



const Layout = (): JSX.Element => {
  return (
    <>
        <div className='layout-wrapper'>
            <NavBar />
            <main className='layout-content'>
                <Outlet />
            </main>
            <Footer />
        </div>
    </>
  );
};

export default Layout;