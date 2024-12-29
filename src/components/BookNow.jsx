import React, { useContext, useState } from "react";
import Modal from "react-modal";
import { toast } from "react-toastify";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { AuthContext } from "../provider/AuthProvider";
import { Helmet } from "react-helmet-async";

Modal.setAppElement("#root");

const BookNow = ({ room, isOpen, onClose }) => {
        const { user } = useContext(AuthContext);
  const [selectedDate, setSelectedDate] = useState(null);
  // Simulated user data
 

  const handleBooking = () => {
    if (!selectedDate) {
      toast.error("Please select a booking date!");
      return;
    }
  
    // Fetch existing bookings for the user
    fetch(`https://stay-ease-server-site.vercel.app/bookings?userEmail=${user?.email}`)
      .then((res) => res.json())
      .then((bookings) => {
        // Check if the current room is already booked
        const alreadyBooked = bookings.some((b) => b.roomId === room._id);
  
        if (alreadyBooked) {
          toast.error("You have already booked this room!");
          return;
        }
  
        // Proceed to make a booking
        const bookingData = {
          roomId: room._id,
          roomTitle: room.title,
          roomDescription: room.description,
          offerPrice: room.specialOffer.offerPrice,
          bookingDate: selectedDate,
          roomImage: room.image,
          userName: user?.name || "Guest",
          userEmail: user?.email,
        };
  
        console.log("Booking Data:", bookingData);
  
        fetch("https://stay-ease-server-site.vercel.app/bookings", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(bookingData),
        })
          .then((res) => res.json())
          .then((data) => {
            if (data.success) {
              toast.success("Room booked successfully!");
              onClose();
            } else {
              toast.error(data.message || "Booking failed!");
            }
          })
          .catch((error) => {
            console.error("Error booking the room:", error);
            toast.error("An error occurred while booking the room.");
          });
      })
      .catch((error) => {
        console.error("Error fetching bookings:", error);
        toast.error("Failed to check existing bookings.");
      });
  };
  
  
  

  return (
  <div>
    <Helmet>
      <title>StayEase | Book-Now</title>
    </Helmet>
      <Modal
      isOpen={isOpen}
      onRequestClose={onClose}
      contentLabel="Book Room"
      className="modal-container"
      overlayClassName="modal-overlay"
    >
      <h2 className="text-2xl font-bold mb-4">Booking Summary</h2>
      <p>
        <strong>Room:</strong> {room.title}
      </p>
      <p>
        <strong>OfferPrice:</strong> ${room.specialOffer.offerPrice} Per Night
      </p>
      <p>
        <strong>Description:</strong> {room.description}
      </p>
      <p>
        <strong>Your Name:</strong> {user.name}
      </p>
      <p>
        <strong>Your Email:</strong> {user.email}
      </p>
      <div className="mt-4">
        <label className="block font-semibold">Select Booking Date:</label>
        <DatePicker
          selected={selectedDate}
          onChange={(date) => setSelectedDate(date)}
          minDate={new Date()}
          dateFormat="dd/MM/yyyy"
          className="border border-gray-300 rounded-md p-2"
        />
      </div>
      <div className="flex justify-end mt-6">
        <button onClick={onClose} className="btn btn-secondary mr-4">
          Cancel
        </button>
        <button onClick={handleBooking} className="btn btn-primary">
          Confirm Booking
        </button>
      </div>
    </Modal>
  </div>
  );
};

export default BookNow;
