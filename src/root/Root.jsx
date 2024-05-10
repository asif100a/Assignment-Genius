import { Outlet } from 'react-router-dom';
import Navber from '../components/SheredComponents/Navber';

const Root = () => {
    return (
        <div>
            <Navber />
            <Outlet />
        </div>
    );
};

export default Root;