import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import ModalUpdate from "../components/ModalUpate";
import DeleteBookingModal from "../components/DeleteBookingModal";
import ReviewBookingModal from "../components/ReviewBookingModal";
import { Helmet } from "react-helmet-async";

const MyBookingRoom = () => {
  const { user } = useContext(AuthContext); // Get user info from AuthContext
  const [bookings, setBookings] = useState([]);
  const [deleteId, setDeleteId] = useState(null); // ID of the booking to delete
  const [editBooking, setEditBooking] = useState(null); // Booking to edit
  const [formData, setFormData] = useState({ bookingDate: "" }); // Data for editing
  const [reviewBooking, setReviewBooking] = useState(null); // Booking for review
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" }); // Review data
  useEffect(() => {
    if (user?.email) {
      console.log("Fetching bookings for email:", user.email); // Debugging log
      fetch(`http://localhost:5000/bookings?email=${user.email}`)
        .then((response) => {
          if (!response.ok) {
            throw new Error("Failed to fetch bookings");
          }
          return response.json();
        })
        .then((data) => {
          // Filter bookings based on user.email if needed
          const filteredBookings = data.filter(
            (booking) => booking.userEmail === user.email
          );
          console.log("Filtered Bookings:", filteredBookings); // Debugging line
          setBookings(filteredBookings); // Set the filtered bookings data
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user]); // Runs whenever 'user' changes
  
  
  
  // Handle update booking date
  const handleUpdateSubmit = () => {
    if (editBooking) {
      const updatedBooking = { ...editBooking, bookingDate: formData.bookingDate };
  
      console.log('Updated Booking:', updatedBooking);  // Debugging line
      
      fetch(`http://localhost:5000/bookings/${editBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBooking),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("Booking updated successfully!");
            setBookings(bookings.map((booking) => (booking._id === editBooking._id ? updatedBooking : booking)));
            setEditBooking(null); // Close the edit modal
          } else {
            toast.error("Failed to update booking.");
          }
        })
        .catch((error) => {
          console.error("Error updating booking:", error);
          toast.error("An error occurred while updating the booking.");
        });
    }
  };
  

  const handleReviewChange = (field, value) => {
    setReviewData((prev) => ({ ...prev, [field]: value }));
  };

  const submitReview = () => {
    if (reviewBooking) {
      const review = {
        username: user?.displayName,
        rating: reviewData.rating,
        comment: reviewData.comment,
        timestamp: new Date().toISOString(),
        roomId: reviewBooking.roomId,
      };

      fetch(`http://localhost:5000/reviews`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(review),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("Review submitted successfully!");
          } else {
            toast.error("Failed to submit review.");
          }
        })
        .catch((error) => {
          console.error("Error submitting review:", error);
          toast.error("An error occurred while submitting the review.");
        })
        .finally(() => {
          setReviewBooking(null); // Close the modal
          setReviewData({ rating: 0, comment: "" }); // Reset review data
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>StayEase | Booking-Rooms</title>
      </Helmet>
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
                  src={booking.roomImage || "https://via.placeholder.com/400"}
                  alt={booking.roomTitle}
                  className="object-cover h-48 w-full"
                />
              </figure>
              <div className="card-body">
                <h2 className="card-title">{booking.roomTitle}</h2>
                <p>{booking.roomDescription}</p>
                <p className="font-semibold"> ${booking.offerPrice}</p>
                <p>
                  <strong>Booking Date:</strong>{" "}
                  {new Date(booking.bookingDate).toLocaleDateString()}
                </p>
                <div className="card-actions justify-end space-x-2">
                  <button
                    className="btn btn-warning btn-sm"
                    onClick={() => setEditBooking(booking)}
                  >
                    Update Date
                  </button>
                  <button
                    className="btn btn-error btn-sm"
                    onClick={() => setDeleteId(booking._id)}
                  >
                    Delete
                  </button>
                  <button
                    className="btn btn-primary btn-sm"
                    onClick={() => setReviewBooking(booking)}
                  >
                    Give Review
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      {/* Delete, Update, and Review Modals */}
      {deleteId && <DeleteBookingModal deleteId={deleteId} setDeleteId={setDeleteId} bookings={bookings} setBookings={setBookings} />}
      {editBooking && (
        <ModalUpdate
          editBooking={editBooking}
          setEditBooking={setEditBooking}
          formData={formData}
          setFormData={setFormData}
          handleUpdateSubmit={handleUpdateSubmit}
        />
      )}
      {reviewBooking && (
        <ReviewBookingModal
          reviewBooking={reviewBooking}
          setReviewBooking={setReviewBooking}
          reviewData={reviewData}
          handleReviewChange={handleReviewChange}
          submitReview={submitReview}
          user={user}
        />
      )}
    </div>
    </div>
  );
};

export default MyBookingRoom;
