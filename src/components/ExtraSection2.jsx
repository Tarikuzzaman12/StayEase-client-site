import React, { useEffect, useState } from "react";

const ExtraSection2 = () => {
  const [rooms, setRooms] = useState([]);

  useEffect(() => {
    fetch("https://stay-ease-server-site.vercel.app/rooms")
      .then((res) => res.json())
      .then((data) => {
        setRooms(data);
      });
  }, []);

  return (
    <section className="bg-white dark:bg-slate-800 py-10">
      <div className="container mx-auto text-center">
        <h2 className="text-2xl font-bold mb-6">Gallery</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 w-full gap-5 px-6">
          {rooms.slice(0, 9).map((room) => (
            <div
              key={room._id}
              className="relative overflow-hidden rounded-md shadow-lg"
            >
              <img
                src={room.image}
                alt={room.title}
                className="w-full h-48 object-cover transition-transform transform hover:scale-105"
              />
              <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                <h3 className="text-lg text-white font-bold">{room.title}</h3>
                <p className="text-sm text-gray-200">
                  Price: ${room.pricePerNight}/night
                </p>
                <p className="text-sm text-gray-200">Size: {room.roomSize}</p>
                <p className="text-sm text-green-400">
                  Availability: {room.availability}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ExtraSection2;
