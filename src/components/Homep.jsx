import React, { useContext } from 'react';
import { useEffect, useState } from "react";
import { AuthContext } from '../provider/AuthProvider';

const Homep = () => {
    const { user } = useContext(AuthContext)
    const [reviews, setreviews] = useState([]);

    // API কল করে ডেটা ফেচ করার জন্য useEffect ব্যবহার
    useEffect(() => {
        fetch("http://localhost:5000/reviews") // ব্যাকএন্ডের API রুট
            .then((res) => res.json())
            .then((data) => {
                setreviews(data); // ডেটা স্টেটে সেট করুন
            })
            .catch((error) => console.error("Error fetching reviews:", error));
    }, []);

    return (
        <div>
            <div className="reviews-section">
            {reviews.length > 0 ? (
                <ul>
                    {reviews.map((review) => (
                        <div key={review._id} className="card bg-base-100  border-2">
                            <figure>
                                <img
                                    className='h-24 w-24 rounded-full p-3'
                                    src={user?.photoURL}
                                    alt="Shoes" />
                            </figure>
                            <div className="card-body">
                                <h2 className="card-title">{review.
                                    username}</h2>
                                <p>Rating :{review.rating}</p>
                                <p>Comment :{review.comment}</p>
                                <p>
                                    Time: {new Date(review.timestamp).toLocaleString("en-US", {
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
                    ))}
                </ul>
            ) : (
                <p>Loading reviews...</p>
            )}
        </div>
        </div>
    );
};

export default Homep;
