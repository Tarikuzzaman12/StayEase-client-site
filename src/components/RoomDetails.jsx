import React, { useContext, useState } from 'react';
import { useLoaderData } from 'react-router-dom';
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { AuthContext } from '../provider/AuthProvider'; // Import AuthContext for user details

const RoomDetails = () => {
    const room = useLoaderData();
    const { title, image, description, pricePerNight, reviews, availability, specialOffer, roomSize } = room;

    const { user } = useContext(AuthContext); // Get logged-in user details
    const [selectedDate, setSelectedDate] = useState(null);
    const [isBookingModalOpen, setBookingModalOpen] = useState(false);

    const handleBookNow = () => {
        if (!availability) {
            toast.error("This room is not available for booking.");
            return;
        }
        setBookingModalOpen(true);
    };

    const handleConfirmBooking = () => {
        if (!selectedDate) {
            toast.error("Please select a booking date.");
            return;
        }

        const bookingData = {
            roomId: room.id,
            title,
            price: specialOffer.offerPrice,
            bookingDate: selectedDate,
            userName: user?.displayName || 'Guest',
            userEmail: user?.email || 'No email provided',
        };

        // Mock API Call or Replace with actual API logic
        console.log('Booking Details:', bookingData);

        toast.success("Room booked successfully!");
        setBookingModalOpen(false);

        // Update room availability logic (assume backend handles this part)
    };

    return (
        <div className="container mx-auto p-4">
            <div className="flex flex-col md:flex-row items-center gap-4">
                <img src={image} alt={title} className="w-full md:w-1/2 rounded" />
                <div className="w-full md:w-1/2">
                    <h1 className="text-3xl font-bold mb-2">{title}</h1>
                    <p className="text-lg text-gray-600 mb-4">{description}</p>
                    <p className="text-lg text-gray-600 mb-4">Availability: {availability}</p>
                    <p className="text-lg text-gray-600 mb-4">Area: {roomSize}</p>
                    <p className="text-xl font-semibold">Price: ${pricePerNight}</p>
                    <p className="text-xl font-semibold">Offer Title: {specialOffer.offerTitle}</p>
                    <p className="text-xl font-semibold">Offer Price: ${specialOffer.offerPrice}</p>
                    <button
                        className="mt-4 px-6 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                        onClick={handleBookNow}
                    >
                        Book Now
                    </button>
                </div>
            </div>

            <div className="mt-8">
                <h2 className="text-2xl font-bold mb-4">Reviews</h2>
                {reviews && reviews.length > 0 ? (
                    <div className="space-y-4">
                        {reviews.map((review, index) => (
                            <div key={index} className="p-4 border rounded">
                                <p className="text-gray-800">{review.comment}</p>
                                <p className="text-gray-500 text-sm">- {review.user}</p>
                            </div>
                        ))}
                    </div>
                ) : (
                    <p className="text-gray-500">No reviews available for this room.</p>
                )}
            </div>

            {isBookingModalOpen && (
                <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
                    <div className="bg-white rounded p-6 w-1/3">
                        <h2 className="text-xl font-bold mb-4">Room Summary</h2>
                        <p className="mb-2">Title: {title}</p>
                        <p className="mb-2">Price: ${specialOffer.offerPrice}</p>
                        <p className="mb-2">Description: {description}</p>
                        <p className="mb-2">User Name: {user?.displayName || 'Guest'}</p>
                        <p className="mb-2">User Email: {user?.email || 'No email provided'}</p>

                        <div className="mb-4">
                            <label className="block font-semibold mb-2">Select Booking Date:</label>
                            <DatePicker
                                selected={selectedDate}
                                onChange={(date) => setSelectedDate(date)}
                                className="border p-2 rounded w-full"
                                minDate={new Date()}
                                placeholderText="Choose a date"
                            />
                        </div>

                        <div className="flex justify-end gap-4">
                            <button
                                className="px-4 py-2 bg-gray-300 rounded hover:bg-gray-400"
                                onClick={() => setBookingModalOpen(false)}
                            >
                                Cancel
                            </button>
                            <button
                                className="px-4 py-2 bg-green-500 text-white rounded hover:bg-green-600"
                                onClick={handleConfirmBooking}
                            >
                                Confirm
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default RoomDetails;
