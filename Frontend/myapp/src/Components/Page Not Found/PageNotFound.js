import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="bg-black text-white min-h-screen flex flex-col justify-center items-center font-playfair">
      <div className="text-center">
        <h1 className="text-9xl font-bold text-red-600">404</h1>
        <p className="text-2xl mt-4">Page Not Found</p>
        <p className="mt-6 text-gray-400">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        <Link
          to="/"
          className="mt-8 inline-block px-6 py-3 bg-red-600 text-white rounded-md hover:bg-red-700 transition-colors"
        >
          Go Back to Home
        </Link>
      </div>
    </div>
  );
};

export default PageNotFound;
