import React, { useContext, useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { toast } from "react-toastify";
import BookNow from "./BookNow";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

const RoomDetails = () => {
  const { id } = useParams(); // Get room ID from URL
  const [room, setRoom] = useState(null); // Store room details
  const [loading, setLoading] = useState(true); // Loading state
  const [isModalOpen, setIsModalOpen] = useState(false); // Modal state
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  // Fetch reviews specific to the current room
  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const res = await fetch(`https://stay-ease-server-site.vercel.app/reviews/${id}`); // Fetch reviews based on roomId
        const data = await res.json();
        setReviews(data); // Set data to state
      } catch (error) {
        toast.error("Error fetching reviews");
      }
    };

    fetchReviews();
  }, [id]); // Only run when the room id changes

  // Fetch room data
  useEffect(() => {
    const loadData = async () => {
      try {
        const res = await fetch(`https://stay-ease-server-site.vercel.app/rooms/${id}`);
        if (!res.ok) throw new Error("Failed to fetch room data");
        const data = await res.json();
        console.log("Fetched room data:", data); // Add this line
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

  // Show loader while data is loading
  if (loading) return <p className="text-center">Loading...</p>;

  // Show error message if room data is not found
  if (!room) return <p className="text-center">Room not found</p>;

  return (
    <div>
      <Helmet>
        <title>StayEase | Details</title>
      </Helmet>
      <div className="p-6 container mx-auto">
        <div className="flex flex-col lg:flex-row gap-8 items-start">
          {/* Room Image */}
          <div className="lg:w-1/2">
            <img
              src={room.image || "https://via.placeholder.com/600"}
              alt={room.title || "Room Image"}
              className="rounded-lg w-full shadow-md"
            />
          </div>

          {/* Room Details */}
          <div className="lg:w-1/2">
            <h1 className="text-3xl font-bold text-gray-800">{room.title}</h1>
            <p className="text-gray-600 mt-3">{room.description}</p>
            <p className="mt-4">
              <span className="font-semibold">Area:</span> {room.roomSize || "N/A"}
            </p>
            <p>
              <span className="font-semibold">Availability:</span>{" "}
              {room.availability ? (
                <span className="text-green-500">Available</span>
              ) : (
                <span className="text-red-500">Unavailable</span>
              )}
            </p>
            <p className="text-lg mt-4">
              <span className="font-semibold">Price:</span> $
              {room.pricePerNight} <span className="text-sm">/ Night</span>
            </p>

            {room.specialOffer && (
              <div className="mt-4 bg-yellow-50 p-4 rounded-lg border border-yellow-300">
                <h3 className="text-lg font-semibold text-yellow-700">
                  {room.specialOffer.offerTitle}
                </h3>
                <p className="text-yellow-800">
                  Offer Price: ${room.specialOffer.offerPrice} / Night
                </p>
              </div>
            )}

            <button
              onClick={() => setIsModalOpen(true)}
              className="btn btn-primary mt-6"
            >
              Book Now
            </button>
          </div>
        </div>

        {/* Reviews Section */}
        <div>
          <h2 className="text-center text-4xl font-semibold mt-8 mb-6">
            User Reviews For this Room
          </h2>
          <div className="w-8/12 mx-auto p-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {reviews.length > 0 ? (
                // Sort reviews in descending order by timestamp
                reviews
                  .sort((a, b) => new Date(b.timestamp) - new Date(a.timestamp))
                  .map((review) => (
                    <div
                      key={review._id}
                      className="bg-base-100 border-2 shadow-lg p-4 rounded-md"
                    >
                      <div className="card-body text-center">
                        <h2 className="card-title font-bold">{review.username}</h2>
                        <p className="text-sm">Rating: {review.rating}</p>
                        <p className="text-sm">Comment: {review.comment}</p>
                        <p className="text-xs text-gray-500">
                          Time:{" "}
                          {new Date(review.timestamp).toLocaleString("en-US", {
                            month: "numeric",
                            day: "numeric",
                            year: "numeric",
                            hour: "numeric",
                            minute: "numeric",
                            second: "numeric",
                            hour12: true,
                          })}
                        </p>
                      </div>
                    </div>
                  ))
              ) : (
                <p>No reviews available for this room.</p>
              )}
            </div>
          </div>
        </div>


        {/* Book Now Modal */}
        <BookNow
          room={room}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      </div>
    </div>
  );
};

export default RoomDetails;
