import React from "react";
import { toast } from "react-toastify";

const DeleteBookingModal = ({ deleteId, setDeleteId, bookings, setBookings }) => {
  const handleDelete = () => {
    if (deleteId) {
      fetch(`http://localhost:5000/bookings/${deleteId}`, {
        method: "DELETE",
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("Booking canceled successfully!");
            setBookings(bookings.filter((booking) => booking._id !== deleteId));
            setDeleteId(null); // Reset delete ID
          } else {
            toast.error(data.message || "Failed to cancel booking.");
          }
        })
        .catch((error) => {
          console.error("Error canceling booking:", error);
          toast.error("An error occurred while canceling the booking.");
        });
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">Are you sure you want to cancel this booking?</h3>
        <p className="text-sm text-gray-600">Cancellation policy: You can cancel a booking only 1 day before the booked date.</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="btn btn-secondary"
            onClick={() => setDeleteId(null)} // Close the modal
          >
            Cancel
          </button>
          <button className="btn btn-danger" onClick={handleDelete}>
            Confirm Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default DeleteBookingModal;
