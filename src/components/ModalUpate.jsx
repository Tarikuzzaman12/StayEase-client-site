import React from "react";

const ModalUpdate = ({ editBooking, setEditBooking, formData, setFormData, handleUpdateSubmit }) => {
  // Get the current date in the format YYYY-MM-DD
  const today = new Date().toISOString().split("T")[0];

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">
          Update Booking Date for {editBooking.roomTitle}
        </h3>
        <div className="space-y-4">
          <input
            type="date"
            className="input input-bordered w-full"
            value={formData.bookingDate}
            min={today} // Prevent selecting past dates
            onChange={(e) =>
              setFormData((prev) => ({ ...prev, bookingDate: e.target.value }))
            }
          />
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="btn btn-secondary"
            onClick={() => setEditBooking(null)} // Close the modal
          >
            Cancel
          </button>
          <button className="btn btn-success" onClick={handleUpdateSubmit}>
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalUpdate;
