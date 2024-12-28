import React, { useContext, useEffect, useState } from "react";
import { AuthContext } from "../provider/AuthProvider";

const Homep = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);

  // API call to fetch data
  useEffect(() => {
    fetch("http://localhost:5000/reviews") // Backend API route
      .then((res) => res.json())
      .then((data) => {
        setReviews(data); // Set data to state
      })
      .catch((error) => console.error("Error fetching reviews:", error));
  }, []);

  return (
   <div>
    <h2 className="text-center text-4xl font-semibold mb-6">Users Reviews</h2>
     <div className="w-8/12 mx-auto p-6">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {reviews.length > 0 ? (
          reviews.map((review) => (
            <div key={review._id} className="bg-base-100 border-2 shadow-lg p-4 rounded-md">
              <figure className="flex justify-center">
                <img
                  className="h-24 w-24 rounded-full"
                  src={user?.photoURL || "https://via.placeholder.com/150"}
                  alt={review.username}
                />
              </figure>
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
          <p>Loading reviews...</p>
        )}
      </div>
    </div>
   </div>
  );
};

export default Homep;
