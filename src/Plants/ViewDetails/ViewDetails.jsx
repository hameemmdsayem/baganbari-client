import { useLoaderData, useNavigate } from "react-router-dom";
import HelmetHook from "../../hooks/HelmetHook";
import { useState } from "react";
import useAuth from "../../hooks/useAuth";
import useAxios from "../../hooks/useAxios";

const ViewDetails = () => {
    const {user} = useAuth();
    const axiosInstance = useAxios();
    const loadedData = useLoaderData();
    const { image, name, price, description, shopName } = loadedData;
    const navigate = useNavigate();
    const handleBackHomePage = () => { navigate("/"); };

    // State to manage the quantity
    const [quantity, setQuantity] = useState(1);

    // Function to increase the quantity
    const increaseQuantity = () => setQuantity(quantity + 1);

    // Function to decrease the quantity (with minimum limit of 1)
    const decreaseQuantity = () => {
        if (quantity > 1) {
            setQuantity(quantity - 1);
        }
    };

    

    const handleAddToCart = () => {
        const productInfo = {
            image, 
            name,
            email : user.email,
            price,
            shopName,
            quantity
        }

        axiosInstance.post('/carts', productInfo);

        console.log(productInfo)
    }

    return (
        <>
            <HelmetHook title={name} />
            <div className="min-h-screen bg-[#ffffff] flex flex-col items-center justify-center p-8 space-y-10 lg:space-y-0 lg:grid lg:grid-cols-3 lg:gap-8 relative">

                {/* First Column - Title and Description */}
                <div className="flex flex-col justify-between p-4 lg:pr-8 relative text-center lg:text-left">
                    <h1 className="text-5xl font-bold text-gray-900 mt-12 ml-4">{name}</h1>
                    <p className="text-lg text-gray-700 mt-4 ml-1">{description}</p>
                </div>

                {/* Second Column - Image and Price */}
                <div className="flex flex-col items-center space-y-8">
                    {/* Product Image */}
                    <div className="flex-grow flex justify-center items-center">
                        <img src={image} alt={name} className="w-64 lg:w-80 object-contain shadow-lg" />
                    </div>
                    {/* Price */}
                    <div className="text-3xl font-bold text-gray-900">${price}</div>
                </div>

                {/* Third Column - Quantity Selector and Buy Button */}
                <div className="flex flex-col items-center justify-end space-y-6">
                    {/* Quantity Selector */}
                    <div className="flex items-center bg-gray-200 rounded-full px-3 py-1 space-x-3">
                        <button onClick={decreaseQuantity} className="text-2xl font-bold text-gray-600">-</button>
                        <span className="text-xl font-semibold text-gray-700">{quantity}</span>
                        <button onClick={increaseQuantity} className="text-2xl font-bold text-gray-600">+</button>
                    </div>

                    {/* Buy Button */}
                    <button className="btn bg-[#2E7D32] text-white rounded-full px-8 py-3 shadow-lg hover:bg-white hover:text-[#2E7D32] hover:border-[#2E7D32] transition duration-300" onClick={handleAddToCart} >
                        Add to cart
                    </button>
                </div>

                {/* Back Arrow Icon with Unique Hover Effect */}
                <div 
                    onClick={handleBackHomePage} 
                    className="absolute top-20 left-12 flex items-center justify-center w-10 h-10 bg-white rounded-full border border-gray-300 cursor-pointer transition-transform duration-300 hover:bg-[#2E7D32] hover:shadow-lg hover:text-white text-black"
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6 "
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12H3m0 0l6-6m-6 6l6 6" />
                    </svg>
                </div>
            </div>
        </>
    );
};

export default ViewDetails;
