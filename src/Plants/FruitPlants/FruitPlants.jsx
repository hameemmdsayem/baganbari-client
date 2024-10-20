import { useEffect, useState } from "react";
import BannerHome from "../../Home/Banner/BannerHome";
import Fruits from "./Fruits";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const FruitPlants = () => {
    const [fruits, setFruits] = useState([]);

    const { loader } = useAuth();
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get('/allplants/fruits')
            .then(data => {
                setFruits(data.data)
            })
    }, [axiosInstance])



    return (
        <div>
            <BannerHome name="Fruit Plants"></BannerHome>

            {
                loader ?
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div> :
                    <div className="mt-8 p-8">
                        <div className="mb-8">
                            <h3 className="text-lg font-bold">Fruits Plants</h3>
                        </div>
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 ">

                                {
                                    fruits.map(fruit => <Fruits key={fruit._id} fruit={fruit}></Fruits>)
                                }
                            </div>
                        </div>

                    </div>
            }

        </div>
    );
};

export default FruitPlants;