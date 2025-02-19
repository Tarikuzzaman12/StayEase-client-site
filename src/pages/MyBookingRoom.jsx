import React, { useState, useEffect, useContext } from "react";
import { AuthContext } from "../provider/AuthProvider";
import { toast } from "react-toastify";
import ModalUpdate from "../components/ModalUpate";
import DeleteBookingModal from "../components/DeleteBookingModal";
import ReviewBookingModal from "../components/ReviewBookingModal";
import { Helmet } from "react-helmet-async";

const MyBookingRoom = () => {
  const { user } = useContext(AuthContext);
  const [bookings, setBookings] = useState([]);
  const [deleteId, setDeleteId] = useState(null);
  const [editBooking, setEditBooking] = useState(null);
  const [formData, setFormData] = useState({ bookingDate: "" });
  const [reviewBooking, setReviewBooking] = useState(null);
  const [reviewData, setReviewData] = useState({ rating: 0, comment: "" });

  useEffect(() => {
    if (user?.email) {
      fetch(`https://stay-ease-server-site.vercel.app/bookings?email=${user.email}`)
        .then((response) => {
          if (!response.ok) throw new Error("Failed to fetch bookings");
          return response.json();
        })
        .then((data) => {
          const filteredBookings = data.filter(
            (booking) => booking.userEmail === user.email
          );
          setBookings(filteredBookings);
        })
        .catch((error) => console.error("Error fetching bookings:", error));
    }
  }, [user]);

  const handleUpdateSubmit = () => {
    if (editBooking) {
      const updatedBooking = { ...editBooking, bookingDate: formData.bookingDate };
      fetch(`https://stay-ease-server-site.vercel.app/bookings/${editBooking._id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedBooking),
      })
        .then((response) => response.json())
        .then((data) => {
          if (data.success) {
            toast.success("Booking updated successfully!");
            setBookings(bookings.map((booking) => 
              booking._id === editBooking._id ? updatedBooking : booking
            ));
            setEditBooking(null);
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

      fetch(`https://stay-ease-server-site.vercel.app/reviews`, {
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
          setReviewBooking(null);
          setReviewData({ rating: 0, comment: "" });
        });
    }
  };

  return (
    <div>
      <Helmet>
        <title>StayEase | Booking-Rooms</title>
      </Helmet>
      <div className="container mx-auto p-8 h-screen dark:bg-slate-800">
        <h1 className="text-3xl text-center font-bold mb-10 dark:text-gray-400">My Bookings</h1>
        {bookings.length === 0 ? (
          <p className="h-screen text-center items-center justify-center  dark:text-gray-400  flex text-3xl font-bold">
            No bookings found.
          </p>
        ) : (
          <div className="overflow-x-auto">
            <table className="table-auto w-full border-collapse border border-gray-200">
              <thead>
                <tr className="bg-gray-100">
                  <th className="border border-gray-300 dark:bg-slate-800  dark:text-gray-400">#</th>
                  <th className="border border-gray-300 dark:bg-slate-800  dark:text-gray-400 p-2">Room Image</th>
                  <th className="border border-gray-30 dark:bg-slate-800  dark:text-gray-400 p-2">Room Title</th>
                  <th className="border border-gray-300 dark:bg-slate-800  dark:text-gray-400 p-2">Price</th>
                  <th className="border border-gray-300 dark:bg-slate-800  dark:text-gray-400 p-2">Booking Date</th>
                  <th className="border border-gray-300 dark:bg-slate-800  dark:text-gray-400 p-2">Actions</th>
                </tr>
              </thead>
              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="hover:bg-gray-50">
                    <td className="border border-gray-300 p-2 dark:text-gray-400 text-center">{index + 1}</td>
                    <td className="border border-gray-300 p-2 text-center">
                      <img
                        src={booking.roomImage || "https://via.placeholder.com/400"}
                        alt={booking.roomTitle}
                        className="h-16 w-16 object-cover mx-auto"
                      />
                    </td>
                    <td className="border border-gray-300 text-center  dark:text-gray-400 p-2">{booking.roomTitle}</td>
                    <td className="border border-gray-300  text-center  dark:text-gray-400  p-2">${booking.offerPrice}</td>
                    <td className="border border-gray-300  dark:text-gray-400  text-center p-2">
                      {new Date(booking.bookingDate).toLocaleDateString()}
                    </td>
                    <td className="border border-gray-300 p-2 text-center space-x-2">
                      <button
                        className="btn btn-warning btn-xs"
                        onClick={() => setEditBooking(booking)}
                      >
                        Update
                      </button>
                      <button
                        className="btn btn-error btn-xs"
                        onClick={() => setDeleteId(booking._id)}
                      >
                        Delete
                      </button>
                      <button
                        className="btn btn-primary btn-xs"
                        onClick={() => setReviewBooking(booking)}
                      >
                        Review
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}

        {/* Delete, Update, and Review Modals */}
        {deleteId && (
          <DeleteBookingModal
            deleteId={deleteId}
            setDeleteId={setDeleteId}
            bookings={bookings}
            setBookings={setBookings}
          />
        )}
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
