import React from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';

const Error = () => {
    return (
      <div>
        <Helmet>
            <title>StayEase | Error</title>
        </Helmet>
          <div className="flex flex-col items-center justify-center h-screen bg-gray-100">
        <h1 className="text-6xl font-bold text-red-500 mb-4">404</h1>
        <h2 className="text-2xl font-semibold text-gray-700 mb-6">
            Oops! Page Not Found
        </h2>
        <p className="text-lg text-gray-500 mb-6">
            The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
        </p>
        <Link
            to="/"
            className="px-6 py-3 text-white bg-blue-500 rounded-lg hover:bg-blue-600 transition-all duration-200"
        >
            Go Back to Home
        </Link>
    </div>
      </div>
 );
};

export default Error;