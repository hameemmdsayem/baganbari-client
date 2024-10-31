import { useLoaderData } from "react-router-dom";
import ShopPlants from "./ShopPlants";
import { useEffect, useState } from "react";
import useAxios from "../hooks/useAxios";

const ShopDetails = () => {
    const loadedData = useLoaderData();
    const axiosIntence = useAxios();
    const [shopData, setShopData] = useState([]);
    const {name, creatorName, shopDetails } = loadedData;

    useEffect(() => {
        axiosIntence.get(`/allplants/shopName/${name}`)
            .then(data => setShopData(data.data))

    }, [axiosIntence, name])

    return (
        
        <div>
            <div className="mt-20 flex flex-col items-center bg-gradient-to-b from-gray-50 to-white p-6 rounded-lg">
            {/* Profile Header */}
            <div className="flex flex-col items-center text-center">
                {/* Avatar */}
                <div className="avatar mb-4">
                    <div className="w-24 rounded-full ring ring-[#859F3D] ring-offset-base-100 ring-offset-2">
                        <img src="https://via.placeholder.com/96" alt="Profile" /> {/* Replace with actual image source */}
                    </div>
                </div>

                {/* Shop Name */}
                <h2 className="text-2xl font-bold text-gray-800 mb-2">{name}</h2>
                {/* Creator Name */}
                <span className="text-sm text-gray-500 mb-4">@{creatorName}</span>

                {/* Shop Description */}
                <p className="text-gray-600 text-sm max-w-xs mb-6">{shopDetails}</p>
            </div>

            {/* Stats Section */}
            <div className="flex justify-center space-x-6 mb-6">
                <div className="text-center">
                    <p className="text-xs text-gray-500">Total Plants</p>
                    <h3 className="text-xl font-semibold text-[#859F3D]">{shopData.length}</h3>
                </div>
            </div>
        </div>
        <div className=" p-10 text-center">
            <h1>All Plants</h1>
            <ShopPlants shopName={name}></ShopPlants>
        </div>
        </div>
    );
};

export default ShopDetails;
