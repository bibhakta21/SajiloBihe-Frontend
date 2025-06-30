import React from "react";
import { Link } from "react-router-dom";
import accessDeniedImage from "../assets/no.png"; // Adjust path based on your folder structure

const AccessDenied = () => {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      {/* Image */}
      <img src={accessDeniedImage} alt="Access Denied" className="w-64 h-auto mb-6" />

      {/* Access Denied Text */}
      <h1 className="text-3xl font-bold text-red-500">Access Denied</h1>
      <p className="text-gray-600 mt-2">You do not have permission to view this page.</p>

      {/* Go to Home Button */}
      <Link to="/" className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">
        Go to Home
      </Link>
    </div>
  );
};

export default AccessDenied;
