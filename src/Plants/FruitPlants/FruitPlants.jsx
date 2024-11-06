import { useEffect, useState } from "react";
import BannerHome from "../../Home/Banner/BannerHome";
import Fruits from "./Fruits";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import PublicBanner from "../../Home/Banner/PublicBanner";

const FruitPlants = () => {
    const [fruits, setFruits] = useState([]);
    const [displayCount, setDisplayCount] = useState(12); // Initial display count
    const { loader } = useAuth();
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/allplants/fruits')
            .then(data => {
                setFruits(data.data);
            })
            .catch(error => {
                console.error("Error fetching fruits:", error);
            });
    }, [axiosInstance]);

    const loadMoreFruits = () => {
        setDisplayCount((prevCount) => prevCount + 6); // Increase display count by 6
    };

    return (
        <div>
            <PublicBanner title="All Shops" description="All Shops is here"></PublicBanner>
            {
                loader ? (
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="mt-8 p-4 sm:p-6 lg:p-8">
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-6 gap-4 lg:gap-6 items-start">
                                {
                                    fruits.slice(0, displayCount).map(fruit => (
                                        <Fruits key={fruit._id} fruit={fruit} />
                                    ))
                                }
                            </div>
                        </div>
                        {displayCount < fruits.length && (
                            <div className="mt-6 text-center">
                                <button
                                    className="mt-6 px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ease-in-out 
                                    bg-[#2E7D32] hover:bg-[#2f5831] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-opacity-50"
                                    onClick={loadMoreFruits}>
                                    Load More
                                </button>
                            </div>
                        )}
                    </div>
                )
            }
        </div>
    );
};

export default FruitPlants;
