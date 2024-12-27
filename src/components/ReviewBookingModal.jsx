import React from "react"
import ReactStars from "react-stars";

const ReviewBookingModal = ({ reviewBooking, setReviewBooking, reviewData, handleReviewChange, submitReview, user }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-96">
        <h3 className="text-lg font-semibold mb-4">
          Review for {reviewBooking.roomTitle}
        </h3>
        <div className="space-y-4">
          <p>
            <strong>Username:</strong> {user?.displayName}
          </p>
          <ReactStars
            count={5}
            size={30}
            value={reviewData.rating}
            onChange={(value) => handleReviewChange("rating", value)}
          />
          <textarea
            className="textarea textarea-bordered w-full"
            rows="4"
            placeholder="Write your review here"
            value={reviewData.comment}
            onChange={(e) =>
              handleReviewChange("comment", e.target.value)
            }
          ></textarea>
        </div>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="btn btn-secondary"
            onClick={() => setReviewBooking(null)}
          >
            Cancel
          </button>
          <button className="btn btn-success" onClick={submitReview}>
            Submit Review
          </button>
        </div>
      </div>
    </div>
  );
};

export default ReviewBookingModal;
