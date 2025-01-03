import React from "react";
import { Link } from "react-router-dom";

const Login = () => {
  return (
    <>
   
      <div className="min-h-screen flex items-center justify-center bg-gray-100 py-10 px-4">
     
        <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
          <h2 className="text-2xl font-semibold text-center mb-6">Login to Your Account</h2>
          <p className="text-gray-600 text-center mb-6">Enter your details to login.</p>
          
       
          <form>
           
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-700 text-sm font-semibold mb-2">
                Email Address *
              </label>
              <input
                type="email"
                id="email"
                className="w-full px-4 py-2 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
                required
                placeholder=""
              />
            </div>
            
          
            <div className="mb-6">
              <label htmlFor="password" className="block text-gray-700 text-sm font-semibold mb-2">
                Password *
              </label>
              <input
                type="password"
                id="password"
                className="w-full px-4 py-2 mb-3 border rounded-lg text-gray-700 focus:ring-blue-500 focus:outline-none"
                required
                placeholder=""
              />
              <div className="text-right">
                <Link to="/forgotpass" className="text-blue-500 hover:underline">
                  Forgot password?
                </Link>
              </div>
            </div>
            
        
            <button
              type="submit"
              className="w-full bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
            >
              Login
            </button>
            
       
            <p className="text-gray-600 text-xs text-center mt-4">
              Don't have an account? 
              <Link to="/register" className="text-blue-500 hover:underline">
                Sign up
              </Link>
            </p>
          </form>
        </div>
      </div>
    </>
  );
};

export default Login;
