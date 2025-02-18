// import React, { useContext, useEffect, useState } from "react";
// import { AuthContext } from "../provider/AuthProvider";

// const Homep = () => {
//   const { user } = useContext(AuthContext);
//   const [reviews, setReviews] = useState([]);

//   // API call to fetch data
//   useEffect(() => {
//     fetch("https://stay-ease-server-site.vercel.app/reviews") // Backend API route
//       .then((res) => res.json())
//       .then((data) => {
//         setReviews(data); // Set data to state
//       })
//       .catch((error) => console.error("Error fetching reviews:", error));
//   }, []);

//   return (
//    <div>
//     <h2 className="text-center text-4xl font-semibold mb-6">Users Reviews</h2>
//      <div className="w-8/12 mx-auto p-6">
//       <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//         {reviews.length > 0 ? (
//           reviews.map((review) => (
//             <div key={review._id} className="bg-base-100 border-2 shadow-lg p-4 rounded-md">
//               <figure className="flex justify-center">
//                 <img
//                   className="h-24 w-24 rounded-full"
//                   src={user?.photoURL || "https://via.placeholder.com/150"}
//                   alt={review.username}
//                 />
//               </figure>
//               <div className="card-body text-center">
//                 <h2 className="card-title font-bold">{review.username}</h2>
//                 <p className="text-sm">Rating: {review.rating}</p>
//                 <p className="text-sm">Comment: {review.comment}</p>
//                 <p className="text-xs text-gray-500">
//                   Time:{" "}
//                   {new Date(review.timestamp).toLocaleString("en-US", {
//                     month: "numeric",
//                     day: "numeric",
//                     year: "numeric",
//                     hour: "numeric",
//                     minute: "numeric",
//                     second: "numeric",
//                     hour12: true,
//                   })}
//                 </p>
//               </div>
//             </div>
//           ))
//         ) : (
//           <p>Loading reviews...</p>
//         )}
//       </div>
//     </div>
//    </div>
//   );
// };

// export default Homep;
import React, { useContext, useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Navigation } from "swiper/modules";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import { AuthContext } from "../provider/AuthProvider";

const Homep = () => {
  const { user } = useContext(AuthContext);
  const [reviews, setReviews] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const response = await fetch("https://stay-ease-server-site.vercel.app/reviews"); // Replace with your backend URL
        if (!response.ok) {
          throw new Error("Failed to fetch reviews");
        }
        const data = await response.json();
        setReviews(data);
      } catch (error) {
        setError(error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchReviews();
  }, []);

  if (loading) return <p>Loading reviews...</p>;
  if (error) return <p>Error: {error}</p>;

  return (
    <section className="bg-gray-100 dark:bg-slate-800 p-10">
      <h2 className="text-3xl font-bold text-center mb-8 dark:text-gray-200">User Reviews</h2>
      <Swiper
        spaceBetween={30}
        pagination={{ clickable: true }}
        navigation={true}
        modules={[Pagination, Navigation]}
        className="mySwiper"
      >
        {reviews.map((review) => (
          <SwiperSlide key={review._id}>
            <div className="bg-white dark:bg-slate-800 dark:border-2  p-6 rounded-md shadow-lg text-center">
              {/* User's Name */}
              <h3 className="text-xl dark:text-gray-200 font-semibold">{review.username}</h3>
              <p className="text-gray-500 text-sm">
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
              {/* Review Comment */}
              <p className="mt-4 text-gray-700">{review.comment}</p>
              {/* Review Rating */}
              <div className="mt-3 text-yellow-500 font-semibold">
                Rating: {review.rating}/5
              </div>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </section>
  );
};

export default Homep;

