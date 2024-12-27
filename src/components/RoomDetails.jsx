import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookNow from "./BookNow";

const RoomDetails = () => {
  const { id } = useParams();
  const [room, setRoom] = useState(null);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`http://localhost:5000/rooms/${id}`);
        if (!res.ok) throw new Error("Failed to fetch room data");
        const data = await res.json();
        setRoom(data);
      } catch (error) {
        console.error(error);
        toast.error("Error fetching room data");
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, [id]);

  if (loading) return <p>Loading...</p>;

  if (!room) return <p>Room not found</p>;

  return (
    <div className="p-6">
      <div className="flex flex-col lg:flex-row gap-6 items-start">
        <div className="lg:w-1/2">
          <img
            src={room.image || "https://via.placeholder.com/400"}
            alt={room.title}
            className="rounded-lg w-full"
          />
        </div>
        <div className="lg:w-1/2">
          <h1 className="text-3xl font-bold">{room.title}</h1>
          <p className="text-gray-600 mt-2">{room.description}</p>
          <p className="mt-2">Area: {room.roomSize}</p>
          <p className="mt-2">Availability: {room.availability}</p>
          <p className="text-lg mt-2">${room.pricePerNight} Per Night</p>
          <p className="text-lg mt-1">{room.specialOffer.offerTitle}</p>
          <p className="text-lg mt-1">
            OfferPrice: ${room.specialOffer.offerPrice} Per Night
          </p>
          <button
            onClick={() => setIsModalOpen(true)}
            className="btn btn-primary mt-6"
          >
            Book Now
          </button>
        </div>
      </div>
      <div className="mt-8">
        <h2 className="text-2xl font-semibold mb-4">Reviews</h2>
        {room.reviews && room.reviews.length > 0 ? (
          room.reviews.map((review, index) => (
            <div key={index} className="border-b border-gray-300 py-2">
              <p className="text-sm text-gray-700">{review.comment}</p>
              <p className="text-sm text-gray-500">- {review.user}</p>
            </div>
          ))
        ) : (
          <p className="text-gray-500">No reviews available for this room.</p>
        )}
      </div>

      {/* BookNow Component */}
      <BookNow
        room={room}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
};

export default RoomDetails;
