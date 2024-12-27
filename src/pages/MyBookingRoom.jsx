import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";

const MyBookingRoom = () => {
  const { user } = useContext(AuthContext); // Get user info from AuthContext
  const [bookings, setBookings] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // ID of the booking to delete

  useEffect(() => {
    if (user?.email) {
      fetch(`http://localhost:5000/bookings?user=${user.email}`)
        .then((response) => response.json())
        .then((data) => {
          setBookings(data); // Set the bookings data from the backend
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user]); // Run the effect when the user object changes

  const handleDelete = () => {
    if (deleteId) {
      fetch(`http://localhost:5000/bookings/${deleteId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("Booking deleted successfully!");
            // Update state to remove the deleted booking
            setBookings((prevBookings) =>
              prevBookings.filter((booking) => booking._id !== deleteId)
            );
          } else {
            toast.error(data.message || "Failed to delete booking.");
          }
        })
        .catch((error) => {
          console.error("Error deleting booking:", error);
          toast.error("An error occurred while deleting the booking.");
        })
        .finally(() => setDeleteId(null)); // Close the modal
    }
  };
  

  const handleUpdate = (id) => {
    toast.info(`Redirect to update booking with ID: ${id}`);
  };

  const handleReview = (id) => {
    toast.info(`Redirect to add review for booking ID: ${id}`);
  };

  return (
    <div className="container mx-auto p-8">
      <h1 className="text-3xl text-center font-bold mb-10">My Bookings</h1>
      {bookings.length === 0 ? (
        <p>No bookings found.</p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {bookings.map((booking, index) => (
            <div key={index} className="card card-compact bg-base-100 shadow-xl">
              <figure>
                <img
                  src={booking.roomImage || "https://via.placeholder.com/400"} // Fallback image
                  alt={booking.roomTitle}
                  className="object-cover h-48 w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{booking.roomTitle}</h2>
                <p className="text-gray-600">
                  <strong>Booking Date:</strong>{" "}
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <p>
                  <strong>Description:</strong> {booking.roomDescription}
                </p>
                <p>
                  <strong>Price:</strong> ${booking.offerPrice} per night
                </p>
                <div className="card-actions justify-end space-x-2">
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => setDeleteId(booking._id)} // Open the modal
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => handleUpdate(booking._id)}
                  >
                    Update
                  </button>
                  <button
                    className="btn btn-success btn-sm"
                    onClick={() => handleReview(booking._id)}
                  >
                    Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Confirmation Modal */}
      {deleteId && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h3 className="text-lg font-semibold mb-4">Confirm Deletion</h3>
            <p>Are you sure you want to delete this booking?</p>
            <div className="mt-4 flex justify-end space-x-2">
              <button
                className="btn btn-secondary"
                onClick={() => setDeleteId(null)} // Close the modal
              >
                Cancel
              </button>
              <button
                className="btn btn-error"
                onClick={handleDelete} // Confirm and delete
              >
                Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MyBookingRoom;
