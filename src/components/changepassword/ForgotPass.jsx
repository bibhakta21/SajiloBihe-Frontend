import React, { useState } from "react";
import axios from "axios";

const ForgotPass = () => {
  const [email, setEmail] = useState("");
  const [error, setError] = useState(""); // Store error message
  const [success, setSuccess] = useState(""); // Store success message

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(""); // Reset errors
    setSuccess("");

    try {
      const response = await axios.post("http://localhost:3000/api/users/forgot-password", { email });

      setSuccess("Check your Gmail. Reset link has been sent!");
      setEmail(""); // Clear email field after success
    } catch (error) {
      setError(error.response?.data?.error || "Failed to send reset link");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Forgot Password</h2>

        {/* Display error message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {/* Display success message */}
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600"
          >
            Send Reset Link
          </button>
        </form>
      </div>
    </div>
  );
};

export default ForgotPass;
