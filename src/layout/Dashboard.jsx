import { IoIosArrowBack } from "react-icons/io";
import { Link, NavLink, Outlet, useLocation, useNavigate } from "react-router-dom";
import useAuth from "../hooks/useAuth";

const Dashboard = () => {

    const isAdmin = false;
    const isUser = false;
    const isOwner = true;

    const location = useLocation;
    
    const navigate = useNavigate();
    const {logOut} = useAuth();
    const handleLogout = () => {
        logOut();
        navigate("/");
    }

    return (
        <div className="flex flex-col lg:flex-row min-h-screen ">
            {/* Sidebar */}
            <div className="bg-[#F6FCDF] text-base-content lg:w-80 w-full lg:min-h-full p-4 lg:fixed">
                <ul className="menu">
                    <li className="mb-2">
                        <Link to={location?.state ? location.state : '/'} className="btn btn-square">
                            <IoIosArrowBack />
                        </Link>
                    </li>

                    {/* Admin Content */}
                    {isAdmin && (
                        <>
                            <li><NavLink to={'/dashboard/admin-home'}>Admin Home</NavLink></li>
                            <li><NavLink to={'/dashboard/all-users'}>All Users</NavLink></li>
                            <li><NavLink to={'/dashboard/all-shops'}>All Shops</NavLink></li>
                        </>
                    )}

                    {/* User Content */}
                    {isUser && (
                        <>
                            <li><NavLink to={'/dashboard/user-home'}>User Home</NavLink></li>
                            <li><NavLink to={'/dashboard/create-shop'}>Create Shop</NavLink></li>
                        </>
                    )}

                    {/* Shop Owner Content */}
                    {isOwner && (
                        <>
                            <li><NavLink to={'/dashboard/shop-home'}>Shop Home</NavLink></li>
                            <li><NavLink to={'/dashboard/sales-report'}>Sales Report</NavLink></li>
                            <li><NavLink to={'/dashboard/all-products'}>All Products</NavLink></li>
                        </>
                    )}
                    <li><NavLink to={'/dashboard/setting'}>Setting</NavLink></li>
                    <li><button onClick={handleLogout}>Logout</button></li>
                </ul>
            </div>

            {/* Main Content */}
            <div className="flex-1 lg:ml-80 p-6 bg-[#F6FCDF]">
                <Outlet />
            </div>
        </div>
    );
};

export default Dashboard;
