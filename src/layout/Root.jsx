import { Outlet, ScrollRestoration, useLocation } from "react-router-dom";
import Heading from "../shared/Heading/Heading";
import Footer from "../shared/Footer/Footer";

const Root = () => {
    const location = useLocation();

    // Check if the current path includes "view-details" to hide the footer
    const hideFooter = location.pathname.includes("plantDetails");

    return (
        <div className="bg-slate-50">
            <Heading />

            <div className="mx-full bg-white rounded-lg">
                <Outlet />
            </div>
            
            {/* Render Footer conditionally */}
            {!hideFooter && <Footer />}

            <ScrollRestoration />
        </div>
    );
};

export default Root;
