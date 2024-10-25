import { Link, NavLink, useLocation } from "react-router-dom";
import HelmetHook from "../../hooks/HelmetHook";
import useAuth from "../../hooks/useAuth";
import image from "../../assets/user.png"

const Heading = () => {

    const isAdmin = false;
    // const isUser = false;
    const isOwner = true;

    const { loader, user, logOut } = useAuth();

    const handleLogout = () => {
        logOut()
        .catch(error => console.log(error))
    }

    const navLinks = <>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="all-plants">All Plants</NavLink></li>
        <li><NavLink to="fruit">Fruit Plants</NavLink></li>
        <li><NavLink to="flower">Flower Plants</NavLink></li>
        <li><NavLink to="shops">Shops</NavLink></li>
        {
            loader ?
                <div className="mt-12 text-center">
                    <span className="loading loading-spinner loading-sm"></span>
                </div> :
                <>
                    {
                        user ?
                            <div className="dropdown dropdown-bottom dropdown-end">
                                <li tabIndex={0} role="button" ><img src={image} className="w-14" /></li>
                                <ul tabIndex={0} className="dropdown-content menu bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li className="p-2 font-semibold">{user.displayName}</li>

                                    {
                                        isAdmin &&
                                        <li><NavLink to={'/dashboard/admin-home'}>Dashboard</NavLink></li>

                                    }

                                    {
                                        isOwner &&
                                        <li><NavLink to={'/dashboard/shop-home'}>Dashboard</NavLink></li>

                                    }


                                    <li><button onClick={handleLogout}>Logout</button></li>
                                </ul>
                            </div>

                            :
                            <li><NavLink to="login">Login</NavLink></li>

                    }
                </>
        }
    </>

    const location = useLocation();
    const currentPath = location.pathname;

    const pageTitles = {
        '/': 'Home',
        '/all-plants': 'All Plants',
        '/fruit': 'Fruit Plants',
        '/flower': 'Flower Plants',
        '/shops': 'Shops',
        '/login': 'Login',
        '/register': 'Register',
    };

    const pageTitle = pageTitles[currentPath] || 'Page Not Found';

    return (
        <div>
            <HelmetHook title={pageTitle}></HelmetHook>

            {/* Navbar */}
            <div className="">
                <div className="navbar bg-base-100 fixed z-10">
                    <div className="navbar-start">
                        <div className="dropdown">
                            <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                                <svg
                                    xmlns="http://www.w3.org/2000/svg"
                                    className="h-5 w-5"
                                    fill="none"
                                    viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path
                                        strokeLinecap="round"
                                        strokeLinejoin="round"
                                        strokeWidth="2"
                                        d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </div>
                            <ul
                                tabIndex={0}
                                className="menu menu-sm dropdown-content bg-base-100 rounded-box z-[1] mt-3 w-52 p-2 shadow">
                                {navLinks}
                            </ul>
                        </div>
                        <Link to="/" className="btn btn-ghost text-xl">BaganBari</Link>
                    </div>
                    <div className="navbar-end hidden lg:flex">
                        <ul className="menu menu-horizontal px-1">
                            {navLinks}
                        </ul>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Heading;