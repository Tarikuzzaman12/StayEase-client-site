import React, { useEffect, useState } from 'react';
import RoomsCards from '../components/RoomsCards';
import { Helmet } from 'react-helmet-async';

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [sortedRooms, setSortedRooms] = useState([]);
    const [sortOrder, setSortOrder] = useState('');
    const [searchTerm, setSearchTerm] = useState('');
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        fetch('https://stay-ease-server-site.vercel.app/rooms')
            .then((res) => {
                if (!res.ok) throw new Error('Failed to fetch rooms');
                return res.json();
            })
            .then((data) => {
                setRooms(data);
                setSortedRooms(data);
                setLoading(false);
            })
            .catch((err) => {
                setError(err.message);
                setLoading(false);
            });
    }, []);

    // Sorting handler
    const handleSort = (order) => {
        setSortOrder(order);
        const sorted = [...rooms].sort((a, b) => {
            if (order === 'low-to-high') {
                return a.pricePerNight - b.pricePerNight;
            } else if (order === 'high-to-low') {
                return b.pricePerNight - a.pricePerNight;
            }
            return 0;
        });
        setSortedRooms(sorted);
    };

    // Filter rooms based on search term
    const handleSearch = () => {
        const filtered = rooms.filter((room) =>
            room.title.toLowerCase().includes(searchTerm.toLowerCase())
        );
        setSortedRooms(filtered);
    };

    return (
        <div>
            <Helmet>
                <title>StayEase | All Rooms</title>
            </Helmet>
            <div id='rooms'>
                <h2 className="text-4xl text-center font-bold mt-10">All Rooms</h2>

                {loading && (
                    <div className="flex items-center justify-center h-screen">
                        <p className="text-lg text-center"><span className="loading loading-bars loading-lg"></span>
                        </p>
                    </div>
                )}

                {error && (
                    <div className="flex items-center justify-center h-screen">
                        <p className="text-center text-red-500">{error}</p>
                    </div>
                )}

                {!loading && !error && (
                    <>
                        {/* Search Bar with Icon */}
                        <div className="flex justify-center items-center my-5">
                            <div className="relative w-full max-w-md">
                                <input
                                    type="text"
                                    placeholder="Search by title..."
                                    className="input input-bordered w-full"
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                />
                                <button
                                    className="absolute right-0 top-0 bottom-0 px-4 bg-primary text-white flex items-center justify-center rounded-r-md"
                                    onClick={handleSearch}
                                >
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 24 24"
                                        fill="currentColor"
                                        className="w-6 h-6"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 2a8 8 0 105.293 13.707l5.607 5.607a1 1 0 01-1.414 1.414l-5.607-5.607A8 8 0 0010 2zm0 2a6 6 0 100 12 6 6 0 000-12z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </button>
                            </div>
                        </div>

                        {/* Sort Dropdown */}
                        <div className="flex justify-center items-center my-5">
                            <details className="dropdown">
                                <summary className="btn btn-outline btn-primary text-xl m-1 flex items-center gap-2">
                                    Sort by Average Cost
                                    <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        viewBox="0 0 20 20"
                                        fill="currentColor"
                                        className="w-5 h-5"
                                    >
                                        <path
                                            fillRule="evenodd"
                                            d="M10 6.707l4.707-4.707a1 1 0 011.414 1.414L10 9.535 4.879 3.414a1 1 0 111.414-1.414L10 6.707z"
                                            clipRule="evenodd"
                                        />
                                    </svg>
                                </summary>
                                <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                                    <li>
                                        <button onClick={() => handleSort('low-to-high')}>
                                            Low To High
                                        </button>
                                    </li>
                                    <li>
                                        <button onClick={() => handleSort('high-to-low')}>
                                            High To Low
                                        </button>
                                    </li>
                                </ul>
                            </details>
                        </div>

                        {/* Room Cards */}
                        <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-11/12 mx-auto p-8 gap-6">
                            {sortedRooms.map((room) => (
                                <RoomsCards key={room._id} room={room}></RoomsCards>
                            ))}
                            {sortedRooms.length === 0 && (
                                <p className="text-center col-span-full text-gray-500">
                                    No rooms found for "{searchTerm}".
                                </p>
                            )}
                        </div>
                    </>
                )}
            </div>
        </div>
    );
};

export default AllRooms;
