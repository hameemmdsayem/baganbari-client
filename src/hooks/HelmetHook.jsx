import { Helmet } from "react-helmet-async";
import PropTypes from 'prop-types';

const HelmetHook = ({title}) => {
    return (
        <Helmet>
            <title>BaganBari | {title}</title>
        </Helmet>
    );
};

HelmetHook.propTypes = {
    title: PropTypes.string
}

export default HelmetHook;