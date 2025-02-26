import React, { useState } from "react";
import axios from "axios";

const ChangePass = () => {
  const [formData, setFormData] = useState({
    oldPassword: "",
    newPassword: "",
  });

  const [error, setError] = useState(""); // Store error message
  const [success, setSuccess] = useState(""); // Store success message

  // Handle input changes
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
    setSuccess("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");

    try {
      const token = localStorage.getItem("token"); // Get user token

      const response = await axios.put(
        "http://localhost:3000/api/users/change-password",
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      setSuccess("Password changed successfully! Please log in again.");
      setFormData({ oldPassword: "", newPassword: "" }); // Clear fields
    } catch (error) {
      setError(error.response?.data?.error || "Failed to change password");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Change Password</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {/* Display success message */}
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Old Password *</label>
            <input
              type="password"
              name="oldPassword"
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Enter old password"
              value={formData.oldPassword}
              onChange={handleChange}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">New Password *</label>
            <input
              type="password"
              name="newPassword"
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Enter new password"
              value={formData.newPassword}
              onChange={handleChange}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Change Password
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePass;
