import BannerHome from "../../Home/Banner/BannerHome";
import Plants from "./Plants";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import { useEffect, useState } from "react";

const AllPlants = () => {

    const [plants, setPlants] = useState([]);

    const { loader } = useAuth();
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get("/allplants")
            .then(data => {
                setPlants(data.data)
            })
    }, [axiosInstance])


    return (
        <div>
            <BannerHome name="Flower/Fruit/All Plants"></BannerHome>

            <div>
                {
                    loader ?
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span> 
                    </div> :
                        <div className="mt-8 p-8">
                            <div className="mb-8">
                                <h3 className="text-lg font-bold">All Plants</h3>
                            </div>

                            <div className="space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 ">
                                    {
                                        plants.map(plant => <Plants key={plant._id} plant={plant}></Plants>)
                                    }
                                </div>
                            </div>
                        </div>

                }
            </div>

        </div>
    );
};

export default AllPlants;