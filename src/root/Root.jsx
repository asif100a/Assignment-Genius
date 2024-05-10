import { Outlet } from 'react-router-dom';
import Navber from '../components/SheredComponents/Navber';
import Footer from '../components/SheredComponents/Footer';
import { Toaster } from 'react-hot-toast';

const Root = () => {
    return (
        <div>
            <Navber />
            <div className='my-12'>
                <Outlet />
                <Toaster />
            </div>
            <Footer />
        </div>
    );
};

export default Root;