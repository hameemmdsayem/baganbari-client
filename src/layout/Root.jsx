import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Heading from "../shared/Heading/Heading";
import Footer from "../shared/Footer/Footer";
import { FaAngleUp, FaShoppingCart } from "react-icons/fa";
import { useEffect, useState } from "react";
import useAuth from "../hooks/useAuth";
import useAxios from "../hooks/useAxios";

const Root = () => {
    const location = useLocation();
    const [data, setData] = useState([]);
    const { user } = useAuth();
    const axiosInstance = useAxios();

    const hideFooter = location.pathname.includes("plantDetails");

    const scrollToTop = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    // Fetch cart data for the logged-in user periodically
    useEffect(() => {
        if (!user) return;

        const fetchCartData = () => {
            axiosInstance.get(`/carts/${user.email}`)
                .then(response => setData(response.data))
                .catch(error => console.error("Error fetching cart data:", error));
        };

        // Fetch initial cart data
        fetchCartData();

        // Set up polling to fetch cart data every 5 seconds
        const intervalId = setInterval(fetchCartData, 100);

        // Clear interval on component unmount
        return () => clearInterval(intervalId);
    }, [axiosInstance, user]);

    return (
        <div className="bg-slate-50">
            <Heading />

            <div className="mx-full bg-white rounded-lg">
                <Outlet />

                {/* Floating buttons for Cart and Scroll to Top */}
                <div className="fixed right-3 bottom-10 flex flex-col gap-2">
                    {/* Cart Button with Indicator */}
                    <Link to={"/shopcart"}>
                        <button
                            className="relative border border-[#2E7D32] bg-white text-[#2E7D32] w-[40px] h-[40px] rounded-full flex items-center justify-center
               hover:bg-[#2E7D32] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                        >
                            <span
                                className="absolute top-0 right-2 transform translate-x-1/2 -translate-y-1/2
                   bg-[#2E7D32] text-white text-xs w-6 h-6 rounded-full flex items-center justify-center font-bold
                   hover:bg-white hover:text-[#2E7D32] border border-white shadow-md"
                            >
                                {data.length}
                            </span>
                            <FaShoppingCart />
                        </button>

                    </Link>

                    {/* Scroll to Top Button */}
                    <button
                        onClick={scrollToTop}
                        className="border border-[#2E7D32] bg-[#2E7D32] text-[#ffffff] w-[40px] h-[40px] rounded-full flex items-center justify-center
                hover:bg-[#ffffff] hover:text-[#2E7D32] hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        <FaAngleUp />
                    </button>
                </div>
            </div>

            {!hideFooter && <Footer />}
            <ScrollRestoration />
        </div>
    );
};

export default Root;
