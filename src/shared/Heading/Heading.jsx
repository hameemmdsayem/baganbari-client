import { useState, useEffect } from "react";
import { Link, NavLink, useLocation } from "react-router-dom";
import HelmetHook from "../../hooks/HelmetHook";
import useAuth from "../../hooks/useAuth";
import image from "../../assets/user.png";
import { FaSearch } from 'react-icons/fa';
import useOwner from "../../hooks/useOwner";
import useUser from "../../hooks/useUser";
import useAdmin from "../../hooks/useAdmin";

const Heading = () => {
    const [scrolled, setScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [userDropdownOpen, setUserDropdownOpen] = useState(false);

    const [isAdmin] = useAdmin();
    const [isUser] = useUser();
    const [isOwner] = useOwner();

    const { loader, user, logOut } = useAuth();
    const location = useLocation(); // Track location changes

    useEffect(() => {
        const handleScroll = () => {
            setScrolled(window.scrollY > 10);
        };
        document.addEventListener('scroll', handleScroll);
        return () => document.removeEventListener('scroll', handleScroll);
    }, []);

    // Collapse mobile menu on page load and route change
    useEffect(() => {
        setMobileMenuOpen(false);
    }, [location]); // Runs whenever location changes

    // Close dropdowns when clicking outside
    useEffect(() => {
        const handleClickOutside = (event) => {
            if (!event.target.closest('.user-dropdown') && userDropdownOpen) {
                setUserDropdownOpen(false);
            }
            if (!event.target.closest('.mobile-menu, .mobile-menu-button') && mobileMenuOpen) {
                setMobileMenuOpen(false);
            }
        };
        document.addEventListener('mousedown', handleClickOutside);
        return () => document.removeEventListener('mousedown', handleClickOutside);
    }, [mobileMenuOpen, userDropdownOpen]);

    const handleLogout = () => {
        logOut().catch(console.log);
    };

    const activeNav = ({ isActive }) => ({
        color: isActive ? '#2E7D32' : '#795548',
        fontWeight: isActive ? '600' : 'normal',
        backgroundColor: isActive ? '#FFF8E1' : 'transparent',
        padding: '0.5rem 1rem',
        borderRadius: '0.25rem',
    });

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
        <div className="sticky top-0 z-10">
            <HelmetHook title={pageTitle} />

            {/* Main Navbar */}
            <div className={`bg-white transition-all duration-300 ease-in-out ${scrolled ? 'shadow-md' : ''}`}>
                <div className="container mx-auto px-4">
                    <div className="navbar py-4 flex justify-between items-center">
                        
                        {/* Mobile Menu Button */}
                        <div className="lg:hidden mobile-menu-button">
                            <button
                                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                                className="btn btn-ghost"
                            >
                                <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" />
                                </svg>
                            </button>
                        </div>

                        {/* Logo */}
                        <Link to="/" className="text-2xl font-bold text-[#2E7D32] ml-2 lg:ml-0">BaganBari</Link>

                        {/* Desktop Navigation */}
                        <div className=" hidden lg:flex flex-1 justify-center">
                            <ul className="flex space-x-8">
                                <li><NavLink to="/" className="hover:text-[#2E7D32]" style={activeNav}>Home</NavLink></li>
                                <li><NavLink to="/all-plants" className="hover:text-[#2E7D32]" style={activeNav}>All Plants</NavLink></li>
                                <li><NavLink to="/fruit" className="hover:text-[#2E7D32]" style={activeNav}>Fruit Plants</NavLink></li>
                                <li><NavLink to="/flower" className="hover:text-[#2E7D32]" style={activeNav}>Flower Plants</NavLink></li>
                                <li><NavLink to="/shops" className="hover:text-[#2E7D32]" style={activeNav}>Shops</NavLink></li>
                            </ul>
                        </div>

                        {/* Right Icons */}
                        <div className="flex items-center gap-1">
                            <button className="btn btn-ghost btn-circle">
                                <Link to="/searchplants"><FaSearch className="text-[#2E7D32] w-5 h-5" /></Link>
                            </button>

                            {/* User Menu */}
                            {loader ? (
                                <div className="w-5 h-5 border-2 border-[#2E7D32] border-t-transparent rounded-full animate-spin" />
                            ) : user ? (
                                <div className="relative user-dropdown">
                                    <button
                                        onClick={() => setUserDropdownOpen(!userDropdownOpen)}
                                        className="flex items-center space-x-2 btn btn-ghost btn-circle"
                                    >
                                        <img src={image} alt="User" className="w-8 h-8 rounded-full" />
                                    </button>
                                    {userDropdownOpen && (
                                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-md overflow-hidden shadow-xl z-10 border border-[#4CAF50]">
                                            <div className="p-2 font-semibold text-[#2E7D32] border-b border-[#4CAF50]">
                                                {user.displayName}
                                            </div>
                                            {isAdmin && (
                                                <Link to="/dashboard/admin-home" className="block px-4 py-2 text-sm text-[#795548] hover:bg-[#FFF8E1] hover:text-[#2E7D32]">
                                                    Admin Dashboard
                                                </Link>
                                            )}
                                            {isOwner && (
                                                <Link to="/dashboard/shop-home" className="block px-4 py-2 text-sm text-[#795548] hover:bg-[#FFF8E1] hover:text-[#2E7D32]">
                                                    Shop Dashboard
                                                </Link>
                                            )}
                                            {isUser && (
                                                <Link to="/dashboard/user-home" className="block px-4 py-2 text-sm text-[#795548] hover:bg-[#FFF8E1] hover:text-[#2E7D32]">
                                                    User Dashboard
                                                </Link>
                                            )}
                                            <button
                                                onClick={handleLogout}
                                                className="block w-full text-left px-4 py-2 text-sm text-[#795548] hover:bg-[#FFF8E1] hover:text-[#2E7D32]"
                                            >
                                                Logout
                                            </button>
                                        </div>
                                    )}
                                </div>
                            ) : (
                                <Link to="/login" className="btn btn-ghost">Login</Link>
                            )}
                        </div>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div className="lg:hidden mobile-menu">
                        <div className="px-4 py-2 space-y-1 bg-white border-t border-gray-200">
                            <Link to="/" className="block py-2 text-[#795548] hover:text-[#2E7D32]">Home</Link>
                            <Link to="/all-plants" className="block py-2 text-[#795548] hover:text-[#2E7D32]">All Plants</Link>
                            <Link to="/fruit" className="block py-2 text-[#795548] hover:text-[#2E7D32]">Fruit Plants</Link>
                            <Link to="/flower" className="block py-2 text-[#795548] hover:text-[#2E7D32]">Flower Plants</Link>
                            <Link to="/shops" className="block py-2 text-[#795548] hover:text-[#2E7D32]">Shops</Link>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Heading;
