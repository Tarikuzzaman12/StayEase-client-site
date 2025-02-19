import React from 'react';
import { Link } from 'react-router-dom';

const RoomsCards = ({ room }) => {
    const { _id,image, title, description, availability, roomSize, reviews, pricePerNight } = room;
    return (
<Link to={`/rooms/${_id}`} className="max-w-sm mx-auto my-4">            <div className="card bg-base-100 shadow-xl dark:bg-gray-950 dark:border-gray-500 border-2">
                <figure>
                    <img
                        src={image}
                        alt={title}
                        className="h-64 w-full object-cover"
                    />
                </figure>
                <div className="card-body h-[340px]">
                    <h2 className="text-2xl font-bold dark:text-gray-400">{title}</h2>
                    <p className="text-lg text-gray-500 font-medium">Room Size: {roomSize}</p>
                    <p className="text-lg text-gray-500 font-medium">
                        Price Per Night: <span className="text-gray-900 font-semibold"><span className='dark:text-gray-400'>${pricePerNight}</span></span>
                    </p>
                    <p className="text-sm text-gray-700  dark:text-gray-500">{description}</p>
                    <div className="card-actions mt-4">
                        <button className="btn btn-primary w-full">Book Now</button>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default RoomsCards;
