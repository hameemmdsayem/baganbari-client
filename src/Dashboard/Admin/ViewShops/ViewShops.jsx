import { useEffect, useState } from "react";
import useAuth from "../../../hooks/useAuth";
import useAxios from "../../../hooks/useAxios";
import HelmetHook from "../../../hooks/HelmetHook";

const ViewShops = () => {
    const [shops, setShops] = useState([]);
    const { loader } = useAuth();
    const axiosInstance = useAxios();

    useEffect(() => {
        axiosInstance.get("/shops")
            .then(data => {
                setShops(data.data);
            })
            .catch(err => {
                console.error("Error fetching shops:", err);
            });
    }, [axiosInstance]);

    const restrictUser = (shop) => {
        axiosInstance.patch(`/shops/restrict/${shop._id}`)
            .then(() => {
                setShops(prevShops =>
                    prevShops.map(s => s._id === shop._id ? { ...s, status: "restrict" } : s)
                );
            })
            .catch(err => {
                console.error("Error restricting shop:", err);
            });
    };

    const activeUser = (shop) => {
        axiosInstance.patch(`/shops/active/${shop._id}`)
            .then(() => {
                setShops(prevShops =>
                    prevShops.map(s => s._id === shop._id ? { ...s, status: "active" } : s)
                );
            })
            .catch(err => {
                console.error("Error activating shop:", err);
            });
    };

    return (
        <>
            <HelmetHook title={'All Shops'} />
            <div>
                {loader ? (
                    <div className="mt-12 text-center">
                        <span className="loading loading-spinner loading-lg"></span>
                    </div>
                ) : (
                    <div className="p-8">
                        <h3 className="text-lg font-bold mb-6">All Shops</h3>
                        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                            {shops.map(shop => (
                                <div key={shop._id} className="bg-white shadow-md rounded-lg p-6 flex flex-col">
                                    <h4 className="text-xl font-semibold">{shop.name}</h4>
                                    <p className="text-gray-600 mt-2">Created by: {shop.creatorName}</p>
                                    <div className="mt-auto">
                                        <button 
                                            onClick={() => shop.status === "restrict" ? activeUser(shop) : restrictUser(shop)} 
                                            className={`mt-4 py-2 px-4 rounded transition-colors duration-300 ${shop.status === "restrict" ? "bg-green-600 text-white hover:bg-green-700" : "bg-red-600 text-white hover:bg-red-700"}`}
                                        >
                                            {shop.status === "restrict" ? "Active Access" : "Restrict Access"}
                                        </button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </>
    );
};

export default ViewShops;
