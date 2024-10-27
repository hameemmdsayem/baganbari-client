import { BsCart4 } from "react-icons/bs";
import PropTypes from 'prop-types';
import { Link } from "react-router-dom";
import bannerImage from "../../assets/banner-home-f.png"
import { LuSearch } from "react-icons/lu";

const BannerHome = ({name}) => {
    return (
        <div style={{ backgroundImage: `url(${bannerImage})` }} className=" bg-no-repeat bg-cover bg-center  h-[40vh] flex flex-col lg:flex-row justify-evenly lg:justify-around items-center">
            <div className="text-black text-center">
                <h2 className="text-2xl lg:text-4xl font-bold">{name}</h2>
                <p className="text-black text-sm lg:text-base">Grow Your Green Space with Ease</p>
                <Link to={"/searchplants"} className="btn bg-[#F6FCDF] hover:bg-[#859F3D] btn-outline btn-sm lg:btn-md mt-8"><button className="flex items-center gap-2">Browse Plants <LuSearch /></button></Link>
            </div>
            {/* <div className="text-white text-center ">
                <Link className="btn btn-white"><button>Browse Plants</button></Link>
            </div> */}

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