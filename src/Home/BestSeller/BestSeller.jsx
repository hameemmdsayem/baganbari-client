import { useEffect, useState } from "react";
import useAxios from "../../hooks/useAxios";
import useAuth from "../../hooks/useAuth";

const BestSeller = () => {

    const [shops, setShops] = useState([]);
    const [datalength, setDatalength] = useState(4);

    const { loader } = useAuth();
    const axiosInstance = useAxios();

    // remove duplicate shopnames

    const removeDuplicatesByShopName = (data) => {
        const uniqueShopMap = new Map();
        data.forEach(shop => {
            if (!uniqueShopMap.has(shop.shop_name)) {
                uniqueShopMap.set(shop.shop_name, shop);
            }
        });
        return Array.from(uniqueShopMap.values());
    };

    const shuffleArray = (array) => {
        return array.sort(() => Math.random() - 0.5);
    };

    useEffect(() => {
        axiosInstance.get("/allplants")
            .then(data => {
                const uniqueShops = removeDuplicatesByShopName(data.data);
                const shuffleData = shuffleArray(uniqueShops);
                setShops(shuffleData)
            })
    }, [axiosInstance])

    return (
        <div className="mt-8 p-8">
            <div className="mb-6">
                <h3 className="text-lg font-bold">Best Sellers</h3>
            </div>

            <div>
                {
                    loader ?
                        <div className="mt-12 text-center">
                            <span className="loading loading-spinner loading-lg"></span>
                        </div> :
                        <div >
                            <div>
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 ">
                                    {
                                        shops.slice(0, datalength).map(shop =>
                                        <div key={shop._id} className="card bg-base-100 w-72 shadow-xl">
                                                <div className="card-body space-y-3">
                                                    <h2 className="font-bold text-base lg:text-lg">&quot;{shop.shop_name}&quot;</h2>

                                                    <div className="flex items-center gap-6">
                                                        <div className="avatar">
                                                            <div className="w-16 rounded-full">
                                                                <img src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp" />
                                                            </div>
                                                        </div>
                                                        <div>
                                                            <h3 className="font-bold text-slate-700">Name</h3>
                                                            <p className="text-slate-400">Description</p>
                                                        </div>

                                                    </div>
                                                </div>
                                            </div>
                                        )
                                    }
                                </div>
                            </div>
                        </div>

                }



            </div>
        </div>
    );
};

export default BestSeller;