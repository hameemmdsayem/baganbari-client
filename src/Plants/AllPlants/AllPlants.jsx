import BannerHome from "../../Home/Banner/BannerHome";
import Plants from "./Plants";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";
import PublicBanner from "../../Home/Banner/PublicBanner";

const AllPlants = () => {
    const [plants, setPlants] = useState([]);
    const [displayCount, setDisplayCount] = useState(12); // Initial display count
    const { loader } = useAuth();
    const axiosInstance = useAxios();

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        axiosInstance.get("/allplants")
            .then(data => {
                const shuffleData = shuffleArray(data.data);
                setPlants(shuffleData); // Set all plants
            })
            .catch(error => {
                console.error("Error fetching plants:", error);
            });
    }, [axiosInstance]);

    const loadMorePlants = () => {
        setDisplayCount(prevCount => prevCount + 6); // Increase display count by 18
    };

    return (
        <div>
            <PublicBanner title="Plants" description="Find your favourite plant"></PublicBanner>

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
                                        plants.slice(0, displayCount).map(plant => (
                                            <Plants key={plant._id} plant={plant} />
                                        ))
                                    }
                                </div>
                            </div>
                            {displayCount < plants.length && (
                                <div className="mt-6 text-center">
                                    <button
                                        className="mt-6 px-4 py-2 text-white font-semibold rounded-lg transition duration-300 ease-in-out 
                       bg-[#2E7D32] hover:bg-[#2e5730] focus:outline-none focus:ring-2 focus:ring-[#859F3D] focus:ring-opacity-50"
                                        onClick={loadMorePlants}>
                                        Load More
                                    </button>
                                </div>
                            )}

                        </div>
                    )
                }
            </div>
        </div>
    );
};

export default AllPlants;
