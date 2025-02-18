import React, { useState } from "react";
import { Link } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });
  
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors(""); // Clear errors on input change
    setSuccess(""); // Clear success message on input change
  };

  const phoneRegex = /^[0-9]{10,15}$/;
if (!phoneRegex.test(formData.phone)) {
  setErrors("Phone number must be between 10-15 digits.");
  return;
}

  
 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
  <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
    <h2 className="text-2xl font-semibold text-center mb-6">Create Your Account</h2>
    <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>

   

    <form>
      {/* Username Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">User Name *</label>
        <input
          type="text"
          name="username"
          
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
          required
          placeholder="Enter Unique name"
        />
      </div>

      {/* Email Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
          required
          placeholder="Enter Your Gmail"
        />
      </div>

      {/* Phone Number Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number *</label>
        <input
          type="text"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
          required
          placeholder="Enter Phone Number (10-15 digits)"
        />
      </div>

      {/* Password Input */}
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
        <input
          type="password"
          name="password"
          value={formData.password}
          onChange={handleChange}
          className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
          required
          placeholder="••••••••"
        />
      </div>

      {/* Register Button */}
      <button
        type="submit"
        className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
      >
        Register
      </button>

      {/* Login Link */}
      <p className="text-gray-600 text-xs text-center mt-4">
        Already have an account?{" "}
        <Link to="/login" className="text-blue-500 hover:underline">
          Login
        </Link>
      </p>
    </form>
  </div>
</div>

  );
};

export default Register;
