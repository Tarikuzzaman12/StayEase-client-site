import React, { useContext } from "react";
import { Link, useLocation } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from "../provider/AuthProvider";

const Navber = () => {
    const { user, signOutUser } = useContext(AuthContext);
    const location = useLocation();

    const handleSignout = () => {
        signOutUser()
            .then(() => {
                console.log("User signed out successfully");
            })
            .catch((error) => {
                console.error("Sign-out failed:", error.message);
            });
    };

    const links = (
        <>
            <li>
                <Link
                    to="/"
                    className={`${
                        location.pathname === "/" ? "text-orange-500 font-bold" : ""
                    } hover:text-orange-500 transition-colors duration-300`}
                >
                    Home
                </Link>
            </li>
            <li>
                <Link
                    to="/rooms"
                    className={`${
                        location.pathname === "/rooms" ? "text-orange-500 font-bold" : ""
                    } hover:text-orange-500 transition-colors duration-300`}
                >
                    All Rooms
                </Link>
            </li>
            {user && (
                <li>
                    <Link
                        to="/my-booking-room"
                        className={`${
                            location.pathname === "/my-booking-room"
                                ? "text-orange-500 font-bold"
                                : ""
                        } hover:text-orange-500 transition-colors duration-300`}
                    >
                        My Bookings Room
                    </Link>
                </li>
            )}
            <li>
                <Link
                    to="/about"
                    className={`${
                        location.pathname === "/about" ? "text-orange-500 font-bold" : ""
                    } hover:text-orange-500 transition-colors duration-300`}
                >
                    About Us
                </Link>
            </li>
            <li>
                <Link
                    to="/contact"
                    className={`${
                        location.pathname === "/contact" ? "text-orange-500 font-bold" : ""
                    } hover:text-orange-500 transition-colors duration-300`}
                >
                    Contact
                </Link>
            </li>
        </>
    );

    return (
        <div className="navbar bg-primary text-white px-4 lg:px-12 sticky top-0 z-50">
            <div className="navbar-start">
                <div className="dropdown">
                    <div tabIndex={0} role="button" className="btn btn-ghost lg:hidden">
                        <svg
                            xmlns="http://www.w3.org/2000/svg"
                            className="h-5 w-5"
                            fill="none"
                            viewBox="0 0 24 24"
                            stroke="currentColor"
                        >
                            <path
                                strokeLinecap="round"
                                strokeLinejoin="round"
                                strokeWidth="2"
                                d="M4 6h16M4 12h8m-8 6h16"
                            />
                        </svg>
                    </div>
                    <ul
                        tabIndex={0}
                        className="menu menu-sm dropdown-content bg-primary text-white rounded-box z-[1] mt-3 w-52 p-2 shadow"
                    >
                        {links}
                    </ul>
                </div>
                <Link to="/" className="btn btn-ghost normal-case text-xl font-bold">
                    StayEase
                </Link>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">{links}</ul>
            </div>
            <div className="navbar-end flex items-center">
                <Link className="text-[20px] flex items-center gap-1 mr-3 hover:text-blue-300 transition-colors duration-300">
                    {user && user.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="User Profile"
                            className="w-10 h-10 rounded-full md:w-12 md:h-12 lg:w-12 lg:h-12"
                        />
                    ) : (
                        <FaUserCircle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
                    )}
                </Link>

                {user ? (
                    <button onClick={handleSignout} className="btn btn-secondary">
                        Log Out
                    </button>
                ) : (
                    <Link to="/login" className="btn btn-accent">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navber;
