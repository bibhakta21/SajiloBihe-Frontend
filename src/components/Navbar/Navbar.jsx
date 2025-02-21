import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { MdMenu } from "react-icons/md";

const Navbar = () => {
  const { user, logout } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const handleLogout = () => {
    logout();
  };

  const validateForm = () => {
    if (!editForm.username.trim()) {
      setError("Username cannot be empty.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(editForm.email)) {
      setError("Invalid email format.");
      return false;
    }
    return true;
  };
  
  

  return (
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">Navbar</h1>

        {/* Mobile Menu Button */}
        <button onClick={() => setIsOpen(!isOpen)} className="lg:hidden">
          <MdMenu size={28} />
        </button>

        {/* Navigation Links */}
        <div className={`lg:flex ${isOpen ? "block" : "hidden"}`}>
          <ul className="flex flex-col lg:flex-row space-y-2 lg:space-y-0 lg:space-x-4">
            <li><Link to="/">Home</Link></li>
            <li><Link to="/product">Products</Link></li>
            <li><Link to="/stories">Stories</Link></li>
            <li><Link to="/about">About</Link></li>
            <li><Link to="/contact">Contact</Link></li>
          </ul>
        </div>

        {/* Authentication Buttons */}
        <div className="hidden lg:flex items-center">
          {user ? (
            <>
              <span>Welcome, {user.username}</span>
              <button onClick={handleLogout} className="ml-4 text-red-500">Logout</button>
            </>
          ) : (
            <>
              <Link to="/login" className="px-4">Sign in</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Register</Link>
            </>
          )}

{isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white shadow-md rounded">
              <ul>
                <li className="p-2">{user.username}</li>
                <li className="p-2"><button onClick={handleLogout}>Logout</button></li>
              </ul>
            </div>
          )}

<button onClick={() => setIsEditPopupOpen(true)}>Edit Profile</button>

{isEditPopupOpen && (
  <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-6 rounded-lg shadow-lg w-96">
      <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
      <input type="text" placeholder="Username" className="w-full px-3 py-2 border rounded mb-2" />
      <input type="email" placeholder="Email" className="w-full px-3 py-2 border rounded mb-2" />
      <div className="flex justify-end gap-2">
        <button onClick={() => setIsEditPopupOpen(false)} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
        <button className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
      </div>
    </div>
  </div>
)}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
