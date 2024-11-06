import { Link, Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Heading from "../shared/Heading/Heading";
import Footer from "../shared/Footer/Footer";
import { FaAngleUp } from "react-icons/fa";
import { FaShoppingCart } from "react-icons/fa";



const Root = () => {
    const location = useLocation();

    // Check if the current path includes "view-details" to hide the footer
    const hideFooter = location.pathname.includes("plantDetails");

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth"  // Smooth scroll effect
        });
    };


    return (
        <div className="bg-slate-50">
            <Heading />

            <div className="mx-full bg-white rounded-lg">
                <Outlet />
                <div className="fixed right-3 bottom-10 flex flex-col gap-2">
                    <Link to={"/shopcart"}>
                    <button
                        className="border border-[#2E7D32] bg-white text-[#2E7D32] w-[40px] h-[40px] rounded-full flex items-center justify-center
                       hover:bg-[#2E7D32] hover:text-white hover:shadow-lg hover:scale-105 transition-all duration-300 ease-in-out"
                    >
                        <FaShoppingCart />
                    </button>
                    </Link>

                    <button
                        onClick={scrollToTop}
                        className="border border-[#2E7D32] bg-[#2E7D32] text-white w-[40px] h-[40px] rounded-full flex items-center justify-center
                       hover:bg-white hover:text-[#2E7D32] hover:shadow-md transition-all duration-300"
                    >
                        <FaAngleUp />
                    </button>


                </div>
            </div>

            {/* Render Footer conditionally */}
            {!hideFooter && <Footer />}

            <ScrollRestoration />
        </div>
    );
};

export default Root;
