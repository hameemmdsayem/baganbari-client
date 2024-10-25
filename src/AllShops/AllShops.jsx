import { useEffect, useState } from "react";
import BannerHome from "../Home/Banner/BannerHome";
import Shops from "./Shops";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const AllShops = () => {

    const [shops, setShops] = useState([]);

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

    useEffect(() => {
        axiosInstance.get("/shops")
            .then(data => {
                // const uniqueShops = removeDuplicatesByShopName(data.data);
                setShops(data.data)
            })
    }, [axiosInstance])

// console.log(shops);
    return (
        <div>
            <BannerHome name="Shops"></BannerHome>

            <div>
                {
                    loader ?
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span> 
                    </div> :
                        <div className="mt-8 p-8">
                            <div className="mb-8">
                                <h3 className="text-lg font-bold">All Shops</h3>
                            </div>

                            <div className="space-y-12">
                                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 space-y-4 lg:space-y-0 ">
                                    {
                                        shops.map(shop => <Shops key={shop._id} shop={shop}></Shops>)
                                    }
                                </div>
                            </div>
                        </div>

                }
            </div>
        </div>
    );
};

export default AllShops;