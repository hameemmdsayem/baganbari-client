import { useEffect, useState } from "react"; 
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";
import Flowers from "../../Plants/FlowerPlants/Flowers";

const FlowerHome = () => {

    const [flowers, setFlowers] = useState([]);
    const [dataLength, setDataLength] = useState(6)

    const { user, loader } = useAuth();
    const axiosInstance = useAxios();

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        axiosInstance.get('/allplants/flowers')
            .then(data => {
                const shuffleData = shuffleArray(data.data)
                setFlowers(shuffleData)
            })
    }, [axiosInstance])

    return (
        <div>
            <div className="lg:h-[70vh] mt-8 p-8">
            <div className="mb-4">
                <h3 className="text-lg font-bold">Flower Plants</h3>
            </div>

            {
                loader ?
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div> :
                    <div className="p-8">
                        <div className="space-y-12">
                            <div className="grid grid-cols-1 lg:grid-cols-6 gap-4 space-y-4 lg:space-y-0 ">

                                {
                                    flowers.slice(0, dataLength).map(flower => <Flowers key={flower._id} flower={flower} email= {user?.email}></Flowers>)
                                }
                            </div>
                        </div>

                    </div>
            }
        </div>
        </div>
    );
};

export default FlowerHome;