import { useEffect, useState } from "react";
import BannerHome from "../../Home/Banner/BannerHome";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Flowers from "./Flowers";

const FlowerPlants = () => {

    const [flowers, setFlowers] = useState([]);

    const { loader } = useAuth();
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/allplants/flowers')
            .then(data => {
                setFlowers(data.data)
            })
    }, [axiosInstance])

    return (
        <div>
            <BannerHome name="Flower Plants"></BannerHome>
            {
                loader ?
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div> :
                    <div className="mt-8 p-8">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold">Flower Plants</h3>
                        </div>
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 ">

                                {
                                    flowers.map(flower => <Flowers key={flower._id} flower={flower}></Flowers>)
                                }
                            </div>
                        </div>

                    </div>
            }

        </div>
    );
};

export default FlowerPlants;