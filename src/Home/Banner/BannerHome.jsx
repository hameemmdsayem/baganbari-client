import { BsCart4 } from "react-icons/bs";
import PropTypes from 'prop-types';

const BannerHome = ({name}) => {
    return (
        <div className="bg-no-repeat bg-cover bg-fixed bg-[url('https://i.ibb.co.com/K0fn5cL/banner-home.png')] h-[90vh] flex justify-center items-center">
            <div className="text-white text-center ">
                <h2 className="text-2xl lg:text-4xl font-bold">{name}</h2>
                <p className="text-sm lg:text-base">Grow Your Green Space with Ease</p>
            </div>

            <div className="text-slate-100 absolute right-8 lg:right-20 mt-6 lg:mt-28 cursor-pointer hover:bg-slate-200 hover:text-black w-6 h-6 lg:w-10 lg:h-10 p-1 lg:p-3 rounded-full">
                <BsCart4 />
            </div>
        </div>
    );
};

BannerHome.propTypes = {
    name: PropTypes.string,
}

export default BannerHome;