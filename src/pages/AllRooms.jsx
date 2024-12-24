import React, { useEffect, useState } from 'react';
import RoomsCards from '../components/RoomsCards';

const AllRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [sortedRooms, setSortedRooms] = useState([]);
    const [sortOrder, setSortOrder] = useState(''); // State to track sort order

    useEffect(() => {
        fetch('http://localhost:5000/rooms')
            .then((res) => res.json())
            .then((data) => {
                setRooms(data);
                setSortedRooms(data); // Initialize sortedRooms with the fetched data
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

    return (
        <div>
            <h2 className="text-4xl text-center font-bold mt-10">All Rooms </h2>
            <div className="flex justify-center items-center my-5">
                <details className="dropdown">
                    <summary className="btn btn-outline btn-primary text-xl m-1 flex items-center gap-2">
                        Sort by Average Cost
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="w-5 h-5">
                            <path
                                fillRule="evenodd"
                                d="M10 6.707l4.707-4.707a1 1 0 011.414 1.414L10 9.535 4.879 3.414a1 1 0 111.414-1.414L10 6.707z"
                                clipRule="evenodd"
                            />
                        </svg>
                    </summary>
                    <ul className="menu dropdown-content bg-base-100 rounded-box z-[1] w-52 p-2 shadow">
                        <li>
                            <button onClick={() => handleSort('low-to-high')}>Low To High</button>
                        </li>
                        <li>
                            <button onClick={() => handleSort('high-to-low')}>High To Low</button>
                        </li>
                    </ul>
                </details>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-11/12 mx-auto p-8 gap-6">
                {sortedRooms.map((room) => (
                    <RoomsCards key={room._id} room={room}></RoomsCards>
                ))}
            </div>
        </div>
    );
};

export default AllRooms;
