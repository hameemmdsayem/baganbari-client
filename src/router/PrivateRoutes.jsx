import { Navigate, useLocation } from "react-router-dom";
import PropTypes from 'prop-types';
import useAuth from "../hooks/useAuth";


const PrivateRoutes = ({ children }) => {

    const { user, loader } = useAuth();

    const location = useLocation();

    if (loader) {
        <span className="loading loading-dots loading-lg flex justify-center items-center min-h-screen"></span>
    } else if (user) {
        return children;
    }
    else {
        return <Navigate state={location.pathname} to='/login'></Navigate>
    }

};

PrivateRoutes.propTypes = {
    children: PropTypes.node,

}

export default PrivateRoutes;