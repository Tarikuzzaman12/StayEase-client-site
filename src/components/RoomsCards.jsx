import React from 'react';

const RoomsCards = ({ room }) => {
    const { image, title, description, availability, roomSize, reviews, pricePerNight } = room;
    return (
        <div className="max-w-sm mx-auto my-4">
            <div className="card bg-base-100 shadow-xl">
                <figure>
                    <img
                        src={image}
                        alt={title}
                        className="h-64 w-full object-cover"
                    />
                </figure>
                <div className="card-body h-[400px]">
                    <h2 className="text-2xl font-bold">{title}</h2>
                    <p className="text-lg text-gray-500 font-medium">Room Size: {roomSize}</p>
                    <p className="text-lg text-gray-500 font-medium">
                        Price Per Night: <span className="text-gray-900 font-semibold">${pricePerNight}</span>
                    </p>
                    <p className={`text-lg font-bold ${availability === "Yes" ? "text-green-500" : "text-red-500"}`}>
                        Availability: {availability}
                    </p>
                    <p className="text-lg text-gray-500 font-medium">
                        Reviews: {reviews.length > 0 ? reviews.length : "No reviews yet"}
                    </p>
                    <p className="text-sm text-gray-700">{description}</p>
                    <div className="card-actions mt-4">
                        <button className="btn btn-primary w-full">Book Now</button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default RoomsCards;
