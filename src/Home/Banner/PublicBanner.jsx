import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import bannerImage from "../../assets/plants-bg.png";

const PublicBanner = ({title,description}) => {
    return (
        <div
            className="relative lg:h-[30vh] bg-cover bg-center flex items-center justify-center" // Center content
            style={{ backgroundImage: `url(${bannerImage})` }}
        >
            {/* Centered Text Section with Dark Background */}
            <div className="text-center p-24 rounded-lg max-w-xl">
                <h1 className="text-3xl lg:text-5xl font-bold text-[#31a937]">
                    {title}
                </h1>
                <p className="text-base lg:text-xl mt-4 text-white">
                {description}
                </p>
            </div>
        </div>
    );
};

PublicBanner.propTypes = {
    title: PropTypes.string,
    description: PropTypes.string,
};

export default PublicBanner;