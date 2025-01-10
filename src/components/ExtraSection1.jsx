import React from 'react';

const ExtraSection1 = () => {
    return (
        <div>
  <section className="bg-gray-50 py-10">
  <div className="w-full text-center">
    <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Premium Amenities</h2>
    <p className="text-gray-600 mb-10">
      Experience the best-in-class facilities designed to make your stay unforgettable.
      From relaxation to recreation, we’ve got it all covered.
    </p>
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8  w-full  px-6">
      {[
        {
          icon: "📶",
          title: "Free Wi-Fi",
          description: "Stay connected with high-speed internet access throughout the hotel.",
        },
        {
          icon: "🏊",
          title: "Swimming Pool",
          description: "Relax and unwind in our temperature-controlled pool.",
        },
        {
          icon: "🏋️",
          title: "Fitness Center",
          description: "Stay fit with our state-of-the-art gym facilities.",
        },
        {
          icon: "🍴",
          title: "Restaurant & Bar",
          description: "Savor delicious cuisines and signature cocktails at our in-house restaurant.",
        },
        {
          icon: "💼",
          title: "Conference Rooms",
          description: "Host successful meetings with our fully equipped conference rooms.",
        },
        {
          icon: "🛎️",
          title: "24/7 Room Service",
          description: "Enjoy personalized service anytime, day or night.",
        },
      ].map((amenity, index) => (
        <div
          key={index}
          className="p-6 bg-white shadow-lg rounded-lg transform transition-transform hover:scale-105"
        >
          <div className="flex items-center justify-center mb-4">
            <span className="text-5xl text-blue-500">{amenity.icon}</span>
          </div>
          <h3 className="text-xl font-semibold text-gray-800 mb-2">
            {amenity.title}
          </h3>
          <p className="text-gray-600 text-sm">{amenity.description}</p>
        </div>
      ))}
    </div>
  </div>
</section>


        </div>
    );
};

export default ExtraSection1;