import React, { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext"; 

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(""); 
  const [success, setSuccess] = useState(""); 
  const navigate = useNavigate();
  const { setUser } = useContext(UserContext); 

  const handleLogin = async (e) => {
    e.preventDefault();
    setError(""); 
    setSuccess("");

    try {
      const response = await fetch("http://localhost:3000/api/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Login failed");
        return;
      }

      localStorage.setItem("token", data.token);

      // Fetch user data after login
      const userResponse = await fetch("http://localhost:3000/api/users/me", {
        method: "GET",
        headers: {
          Authorization: `Bearer ${data.token}`,
        },
      });

      if (userResponse.ok) {
        const userData = await userResponse.json();
        setUser(userData); // Update UserContext with the logged-in user
      }

      setSuccess("Login successful! Redirecting...");
      
      setTimeout(() => navigate("/"), 2000);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
        <p className="text-gray-600 text-center mb-6">Enter your details to login.</p>

        {/* Error message */}
        {error && <p className="text-red-500 text-sm text-center mb-4">{error}</p>}
        {success && <p className="text-green-500 text-sm text-center mb-4">{success}</p>}

        <form onSubmit={handleLogin}>
          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Email Address *</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="mb-4">
            <label className="block text-gray-700 text-sm font-semibold mb-2">Password *</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
              required
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <div className="flex justify-end mb-6">
            <Link to="/forgotpass" className="text-sm text-blue-500 hover:underline">
              Forgot password?
            </Link>
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
          >
            Login
          </button>

          <p className="text-gray-600 text-xs text-center mt-4">
            Don't have an account?{" "}
            <Link to="/register" className="text-blue-500 hover:underline">
              Sign up
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default Login;
