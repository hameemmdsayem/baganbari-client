import PropTypes from 'prop-types';
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";
import useAuth from '../hooks/useAuth';
import { FaShoppingCart } from 'react-icons/fa';
import { Link } from 'react-router-dom';

const ShopPlants = ({ shopName }) => {

    const axiosIntence = useAxios();
    const [shopData, setShopData] = useState([]);
    const [displayCount, setDisplayCount] = useState(12); // Initial display count
    const { loader } = useAuth();

    useEffect(() => {
        axiosIntence.get(`/allplants/shopName/${shopName}`)
            .then(data => setShopData(data.data))

    }, [axiosIntence, shopName])

    const loadMorePlants = () => {
        setDisplayCount(prevCount => prevCount + 6); // Increase display count by 18
    };


    return (
        <div>
            <div>
                {
                    loader ? (
                        <div className="mt-12 text-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div>
                    ) : (
                        <div className="mt-8 p-4 sm:p-6 lg:p-8">
                            {/* <div className="mb-8 text-center">
                                <h3 className="text-lg font-bold">All Plants</h3>
                            </div> */}

                            <div className="space-y-12">
                                <div className="grid grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-4 lg:gap-6 items-start">
                                    {
                                        shopData.slice(0, displayCount).map(data => <div key={
                                            data._id
                                        } className="block w-full max-w-[95%] sm:max-w-xs mx-auto">
                                            <div className="card w-full bg-base-100 shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 overflow-hidden">
                                                <figure className="relative aspect-square">
                                                    <img
                                                        src={data.image}
                                                        alt={data.name}
                                                        className="w-full h-full object-cover transition-transform duration-300 hover:scale-105"
                                                    />
                        
                        
                                                    <div className="absolute top-5 right-3 bg-black bg-opacity-10 rounded-full p-3">
                                                        <FaShoppingCart className="h-5 w-5 sm:h-5 sm:w-5 text-white  cursor-pointer " />
                                                    </div>
                                                </figure>
                                                <div className="card-body p-2 sm:p-4 md:p-6 bg-gradient-to-b from-green-50 to-white">
                                                    <h2 className="card-title text-sm sm:text-md md:text-lg font-semibold text-[#859F3D] mb-2 truncate">{data.name}</h2>
                                                    <div className="flex flex-col lg:flex-row justify-between items-center mt-1">
                                                        <span className="badge badge-outline badge-lg text-white bg-[#859F3D] border-[#95b440] px-2 py-1 sm:px-3 sm:py-2 mb-4">
                                                            ${data.price.toFixed(2)}
                                                        </span>
                                                        <Link to={`/plantDetails/${data._id}`} className="badge badge-outline badge-lg text-xs sm:text-sm md:text-base font-medium text-[#859F3D] hover:bg-[#859F3D] hover:text-[#F6FCDF]">
                                                            <span>View Details</span>
                                                        </Link>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>)
                                    }
                                </div>
                            </div>
                            {displayCount < shopData.length && (
                                <div className="mt-6 text-center">
                                    <button
                                        className="mt-6 px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ease-in-out 
                       bg-[#859F3D] hover:bg-[#7a8b36] focus:outline-none focus:ring-2 focus:ring-[#859F3D] focus:ring-opacity-50"
                                        onClick={loadMorePlants}>
                                        Load More
                                    </button>
                                </div>
                            )}

                        </div>
                    )
                }
            </div>


            <div>
                
            </div>
        </div>
    );
};

ShopPlants.propTypes = {
    shopName: PropTypes.string
}

export default ShopPlants;