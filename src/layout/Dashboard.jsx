import { IoIosArrowBack } from "react-icons/io";
import { Link, NavLink, Outlet } from "react-router-dom";

const Dashboard = () => {

    const isAdmin = true;
    const isUser = false;
    const isOwner = false;


    return (
        <div className="flex flex-col lg:flex-row">
            <div>
                <div className="drawer-open">
                    <input id="my-drawer" type="checkbox" className="drawer-toggle" />
                    <div className="drawer-content">
                        {/* Page content here */}
                        {/*  <label htmlFor="my-drawer" className="btn btn-primary drawer-button">Open drawer</label> */}
                    </div>
                    <div className="lg:drawer-side">
                        <label htmlFor="my-drawer" aria-label="close sidebar" className="drawer-overlay"></label>
                        <ul className="menu bg-base-200 text-base-content lg:min-h-full min-w-full lg:w-80 p-4">

                            <li className="mb-2"><Link to={'/'}  className="btn btn-square"><IoIosArrowBack /></Link></li>

                            {/* Admin Content */}
                            {
                                isAdmin &&
                                <>
                                    <li><NavLink to={'/dashboard/admin-home'}>Admin Home</NavLink></li>
                                    <li><NavLink to={'/dashboard/all-users'}>All Users</NavLink></li>
                                    <li><NavLink to={'/dashboard/all-shops'}>All Shops</NavLink></li>
                                </>
                            }

                            {/* User Content */}
                            {
                                isUser &&
                                <>
                                    <li><NavLink to={'/dashboard/admin-home'}>User Home</NavLink></li>
                                    <li><NavLink to={'/dashboard/all-users'}>All Users</NavLink></li>
                                    <li><NavLink to={'/dashboard/all-shops'}>All Shops</NavLink></li>
                                </>
                            }

                            {/* Shop Owner Content */}
                            {
                                isOwner &&
                                <>
                                    <li><NavLink to={'/dashboard/shop-home'}>Shop Home</NavLink></li>
                                    <li><NavLink to={'/dashboard/sales-report'}>Sales Report</NavLink></li>
                                    <li><NavLink to={'/dashboard/all-products'}>All Products</NavLink></li>
                                </>
                            }
                        </ul>
                    </div>
                </div>
            </div>

            {/* Outlet div */}
            <div className="flex-1 p-6">
                <Outlet></Outlet>
            </div>

        </div>
    );
};

export default Dashboard;