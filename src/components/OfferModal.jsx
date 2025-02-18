import React from "react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const OfferModal = ({ isOpen, closeModal }) => {
  if (!isOpen) return null;

  const handleClaimOffer = () => {
    toast.success("🎉 Offer Applied Successfully!");
    closeModal();
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white dark:bg-slate-800 rounded-lg shadow-lg p-6 w-11/12 md:w-2/3 lg:w-1/2 relative">
        <button
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 text-lg"
          onClick={closeModal}
        >
          &times;
        </button>
        <h2 className="text-2xl font-bold mb-4 text-center text-red-500">Special Offers!</h2>
        <div className="flex flex-col items-center space-y-4">
          <img
            src="https://media.istockphoto.com/id/1140789874/photo/special-offer-text-from-wooden-blocks.jpg?s=1024x1024&w=is&k=20&c=vm7evLARsEyc0zvegg9oAQEptgbYO3673AoFkF9VvW0="
            alt="Special Offer"
            className="rounded-lg"
          />
          <p className="text-center text-gray-700 dark:text-gray-400">
            Grab up to <strong>50% Off</strong> on selected bookings. Don't miss out!
          </p>
          <button
            className="btn btn-primary mt-4"
            onClick={handleClaimOffer}
          >
            Claim Offer
          </button>
        </div>
      </div>
    </div>
  );
};

export default OfferModal;
