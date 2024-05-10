import PropTypes from 'prop-types';
import { Navigate, useLocation } from 'react-router-dom';
import useAuth from '../Hooks/useAuth';
import { Audio } from 'react-loader-spinner';

const ProtectedPage = ({ children }) => {
    const { user, loading } = useAuth();
    const location = useLocation();
    console.log(location)

    if (loading) {
        return (
            <div className='w-full h-[calc(100vh-300px)] flex justify-center items-center'>
                <Audio
                    height="80"
                    width="80"
                    radius="9"
                    color="green"
                    ariaLabel="loading"
                    wrapperStyle
                    wrapperClass
                />
            </div>
        );
    }

    if (user) {
        return children;
    }

    return <Navigate state={location.pathname} to={'/sign_in'} replace />;
};

ProtectedPage.propTypes = {
    children: PropTypes.node
};

export default ProtectedPage;
