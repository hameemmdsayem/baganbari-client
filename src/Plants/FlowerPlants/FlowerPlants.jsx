import { useEffect, useState } from "react";
import BannerHome from "../../Home/Banner/BannerHome";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Flowers from "./Flowers";
import PublicBanner from "../../Home/Banner/PublicBanner";

const FlowerPlants = () => {
    const [flowers, setFlowers] = useState([]);
    const [displayCount, setDisplayCount] = useState(12); // Initial display count
    const { loader } = useAuth();
    const axiosInstance = useAxios();

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        axiosInstance.get('/allplants/flowers')
            .then(data => {
                const shuffledFlowers = shuffleArray(data.data);
                setFlowers(shuffledFlowers);
            })
            .catch(error => {
                console.error("Error fetching flowers:", error);
            });
    }, [axiosInstance]);

    const loadMoreFlowers = () => {
        setDisplayCount((prevCount) => prevCount + 6); // Increase display count by 6
    };

    return (
        <div>
            <PublicBanner title="Beautiful Flowering Plants" description="Brighten your garden with our stunning flowering plant selection."></PublicBanner>
            {
                loader ? (
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="mt-8 p-4 sm:p-6 lg:p-8">
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 lg:gap-6 items-start">
                                {
                                    flowers.slice(0, displayCount).map(flower => (
                                        <Flowers key={flower._id} flower={flower} />
                                    ))
                                }
                            </div>
                        </div>
                        {displayCount < flowers.length && (
                            <div className="mt-6 text-center">
                                <button
                                    className="mt-6 px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ease-in-out 
                                    bg-[#2E7D32] hover:bg-[#315433] focus:outline-none focus:ring-2 focus:ring-[#2E7D32] focus:ring-opacity-50"
                                    onClick={loadMoreFlowers}>
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

export default FlowerPlants;
