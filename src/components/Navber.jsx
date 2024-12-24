import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { FaUserCircle } from "react-icons/fa";
import { AuthContext } from '../provider/AuthProvider';

const Navber = () => {
    const { user, signOutUser } = useContext(AuthContext);

    const handleSignout = () => {
        signOutUser()
            .then(() => {
                console.log("User signed out successfully");
            })
            .catch((error) => {
                console.error("Sign-out failed:", error.message);
            });
    };
    const links = <>
        <li><Link to="/">Home</Link></li>
        <li> <Link to="all-rooms">All Rooms</Link></li>
        <li><Link to="my-booking-room">My Bookings Room</Link></li>
    </>
    return (
        <div className="navbar bg-base-100">
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
                        {
                            links
                        }
                    </ul>
                </div>
                <a className="btn btn-ghost text-xl font-bold">StayEase</a>
            </div>
            <div className="navbar-center hidden lg:flex">
                <ul className="menu menu-horizontal px-1">
                    {
                        links
                    }
                </ul>
            </div>
            <div className="navbar-end">
                <Link className="text-[20px] flex items-center gap-1 mr-3 hover:text-blue-500 transition-colors duration-300">
                    {user && user.photoURL ? (
                        <img
                            src={user.photoURL}
                            alt="User Profile"
                            className="w-10 h-10  rounded-full  md:w-12 md:h-12 lg:w-12 lg:h-12"
                        />
                    ) : (
                        <FaUserCircle className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl" />
                    )}
                </Link>

                {user ? (
                    <button onClick={handleSignout} className="btn">
                        Log Out
                    </button>
                ) : (
                    <Link to="/login" className="btn">
                        Login
                    </Link>
                )}
            </div>
        </div>
    );
};

export default Navber;