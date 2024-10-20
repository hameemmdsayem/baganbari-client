import { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Fruits from "../../Plants/FruitPlants/Fruits";

const FruitHome = () => {
    const [fruits, setFruits] = useState([]);
    const [dataLength, setDataLength] = useState(4);

    const { loader } = useAuth();
    const axiosInstance = useAxios();

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        axiosInstance.get('/allplants/fruits')
            .then(data => {
                const shuffleData = shuffleArray(data.data)
                setFruits(shuffleData)
            })
    }, [axiosInstance])

    return (
        <div>
            <div className="mt-8 p-8">
                <div className="mb-8">
                    <h3 className="text-lg font-bold">Fruit Plants</h3>
                </div>


                {
                    loader ?
                        <div className="mt-12 text-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div> :
                        <div className="mt-8 p-8">
                            <div className="space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 ">

                                    {
                                        fruits.slice(0, dataLength).map(fruit => <Fruits key={fruit._id} fruit={fruit}></Fruits>)
                                    }
                                </div>
                            </div>

                        </div>
                }

            </div>
        </div>
    );
};

export default FruitHome;