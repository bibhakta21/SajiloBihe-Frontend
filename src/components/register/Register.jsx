import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    phone: "",
    password: "",
  });

  const [errors, setErrors] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
    setErrors("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors("");

    const phoneRegex = /^[0-9]{10,15}$/;
    if (!phoneRegex.test(formData.phone)) {
      setErrors("Phone number must be between 10-15 digits.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/users/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const data = await response.json();

      if (response.ok) {
        toast.success("Registration successful! Redirecting to login...");
        setFormData({ username: "", email: "", phone: "", password: "" });
        setTimeout(() => navigate("/login"), 2000);
      } else {
        setErrors(data.error || "Registration failed. Please try again.");
      }
    } catch (error) {
      setErrors("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Create Your Account</h2>
        <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>
        {errors && <p className="text-red-500 text-sm text-center mb-4">{errors}</p>}

        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">User Name *</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="Enter Unique name"
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="Enter Your Email"
            />
          </div>

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

          <div className="mb-4 relative">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                name="password"
                value={formData.password}
                onChange={handleChange}
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none pr-10"
                required
                placeholder="••••••••"
              />
              <span
                className="absolute right-3 top-3 cursor-pointer text-gray-600"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </span>
            </div>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Register
          </button>

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
// import React, { useState } from "react";
// import { Link, useNavigate } from "react-router-dom";

// const Register = () => {
//   const [formData, setFormData] = useState({
//     username: "",
//     email: "",
//     phone: "",
//     password: "",
//   });

//   const [errors, setErrors] = useState(""); // Store error messages
//   const [success, setSuccess] = useState(""); // Store success message
//   const navigate = useNavigate();

//   // Handle input changes
//   const handleChange = (e) => {
//     setFormData({ ...formData, [e.target.name]: e.target.value });
//     setErrors(""); // Clear errors on input change
//     setSuccess(""); // Clear success message on input change
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setErrors("");
//     setSuccess("");

//     // Validate phone number format (10-15 digits)
//     const phoneRegex = /^[0-9]{10,15}$/;
//     if (!phoneRegex.test(formData.phone)) {
//       setErrors("Phone number must be between 10-15 digits.");
//       return;
//     }

//     try {
//       const response = await fetch("http://localhost:3000/api/users/signup", {
//         method: "POST",
//         headers: {
//           "Content-Type": "application/json",
//         },
//         body: JSON.stringify(formData),
//       });

//       const data = await response.json();

//       if (response.ok) {
//         setSuccess("Successfully registered! Redirecting to login...");
//         setFormData({ username: "", email: "", phone: "", password: "" });

//         // Redirect after a delay
//         setTimeout(() => navigate("/login"), 2000);
//       } else {
//         setErrors(data.error || "Registration failed. Please try again.");
//       }
//     } catch (error) {
//       setErrors("Something went wrong. Please try again.");
//     }
//   };

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
//       <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
//         <h2 className="text-2xl font-semibold text-center mb-6">Create Your Account</h2>
//         <p className="text-gray-600 text-center mb-6">Enter your details to register.</p>

//         {/* Display error message */}
//         {errors && <p className="text-red-500 text-sm text-center mb-4">{errors}</p>}
//         {/* Display success message */}
//         {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

//         <form onSubmit={handleSubmit}>
//           {/* Username Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">User Name *</label>
//             <input
//               type="text"
//               name="username"
//               value={formData.username}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
//               required
//               placeholder="Enter Unique name"
//             />
//           </div>

//           {/* Email Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
//             <input
//               type="email"
//               name="email"
//               value={formData.email}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
//               required
//               placeholder="Enter Your Gmail"
//             />
//           </div>

//           {/* Phone Number Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">Phone Number *</label>
//             <input
//               type="text"
//               name="phone"
//               value={formData.phone}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
//               required
//               placeholder="Enter Phone Number (10-15 digits)"
//             />
//           </div>

//           {/* Password Input */}
//           <div className="mb-4">
//             <label className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
//             <input
//               type="password"
//               name="password"
//               value={formData.password}
//               onChange={handleChange}
//               className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
//               required
//               placeholder="••••••••"
//             />
//           </div>

//           {/* Register Button */}
//           <button
//             type="submit"
//             className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
//           >
//             Register
//           </button>

//           {/* Login Link */}
//           <p className="text-gray-600 text-xs text-center mt-4">
//             Already have an account?{" "}
//             <Link to="/login" className="text-blue-500 hover:underline">
//               Login
//             </Link>
//           </p>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default Register;
