import React, { useEffect, useState } from 'react';
import RoomsCards from './RoomsCards';
import { Link } from 'react-router-dom';

const FeaturesRooms = () => {
    const [rooms, setRooms] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('https://stay-ease-server-site.vercel.app/rooms')

            .then((res) => res.json())
            .then((data) => {
                if (Array.isArray(data)) {
                    const sortedRooms = data
                        .sort((a, b) => b.pricePerNight - a.pricePerNight)
                        .slice(0, 6);
                    setRooms(sortedRooms);
                } else {
                    console.error('Invalid data format received:', data);
                }
                setLoading(false);
            })
            .catch((error) => {
                console.error('Error fetching rooms:', error);
                setLoading(false);
            });
    }, []);

    if (loading) {
        return <div className="text-center">Loading Featured Rooms...</div>;
    }

    return (
        <div>
            <h2 className="text-4xl text-center font-bold mt-20">Featured Rooms</h2>
            <div className="grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 w-full mx-auto p-8 gap-6">
                {rooms?.map((room) => (
                    <RoomsCards key={room._id} room={room}></RoomsCards>
                ))}
            </div>
            <div className="flex items-center justify-center mt-4 mb-6">
                <Link to={`/rooms`} className="btn text-lg btn-primary text-white border-none">
                    Show More Room Collections
                </Link>
            </div>
        </div>
    );
};

export default FeaturesRooms;
