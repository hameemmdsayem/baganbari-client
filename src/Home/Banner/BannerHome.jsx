import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner-bg-home.jpg";

const BannerHome = () => {
    return (
        <div
            className="relative lg:h-[95vh] bg-cover bg-center flex items-center justify-center" // Center content
            style={{ backgroundImage: `url(${bannerImage})` }}
        >
            {/* Centered Text Section with Dark Background */}
            <div className="text-center p-24 rounded-lg max-w-xl">
                <h1 className="text-3xl lg:text-5xl font-bold text-[#2E7D32]">
                    BAGANBARI
                </h1>
                <p className="text-base lg:text-xl mt-4">
                We love helping you to <br />save the earth
                </p>
                <div className="flex gap-4 justify-center mt-6">
                    <Link
                        to="/join"
                        className="btn bg-[#2E7D32] text-white hover:bg-[#2E7D32] px-6 py-2 rounded-md"
                    >
                        View All Plants →
                    </Link>
                </div>
            </div>
        </div>
    );
};

BannerHome.propTypes = {
    name: PropTypes.string,
    description: PropTypes.string,
};

export default BannerHome;
