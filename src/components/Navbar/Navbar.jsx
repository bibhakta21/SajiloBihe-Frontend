import { motion } from "framer-motion";
import React, { useContext, useState } from "react";
import { MdMenu } from "react-icons/md";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { MdShoppingCart } from "react-icons/md";

const Navbar = () => {
  const { user, logout, setUser } = useContext(UserContext);
  const navigate = useNavigate();
  const location = useLocation();
  const [isOpen, setIsOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const [editForm, setEditForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [error, setError] = useState("");

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  // Navigate to Change Password Page
  const handleChangePassword = () => {
    navigate("/changepass");
    setIsDropdownOpen(false);
  };

  

  // Handle input changes in edit form
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setError(""); // Clear error message when user types
  };

  // Validate form inputs
  const validateForm = () => {
    if (!editForm.username.trim()) {
      setError("Username cannot be empty.");
      return false;
    }
    if (!/^\S+@\S+\.\S+$/.test(editForm.email)) {
      setError("Invalid email format.");
      return false;
    }
    if (!/^[0-9]{10,15}$/.test(editForm.phone)) {
      setError("Phone number must be between 10-15 digits.");
      return false;
    }
    return true;
  };

  // Function to update user details
  const handleSave = async () => {
    if (!validateForm()) return;

    try {
      const token = localStorage.getItem("token");
      const response = await fetch("http://localhost:3000/api/users/me", {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(editForm),
      });

      const data = await response.json();

      if (!response.ok) {
        setError(data.error || "Failed to update profile.");
        return;
      }

      setUser(data.user); // Update user context with new data
      setIsEditPopupOpen(false);
      setIsDropdownOpen(false);
    } catch (error) {
      setError("Something went wrong. Please try again.");
    }
  };

  // Function to scroll to a specific section
  const handleScroll = (sectionId) => {
    if (location.pathname !== "/") {
      navigate("/", { replace: true });
      setTimeout(() => {
        scrollToSection(sectionId);
      }, 100);
    } else {
      scrollToSection(sectionId);
    }
  };

  // Smooth scrolling function
  const scrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <>
      <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ duration: 0.5, delay: 0.5 }}>
        <div className="container flex justify-between items-center py-6">
          {/* Logo */}
          <div className="text-2xl flex items-center gap-2 font-bold">
            <Link to="/">
              <p>Sajilo<span className="text-blue-600">Bihe</span></p>
            </Link>
          </div>

          {/* Navigation Links */}
          <div className="hidden lg:block">
            <ul className="flex items-center gap-6">
              <li>
                <Link to="/" className="text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-blue-600 font-semibold">
                  Home
                </Link>
              </li>
              
              <li>
                <Link to="/product" className="text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-blue-600 font-semibold">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/stories" className="text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-blue-600 font-semibold">
                  Stories
                </Link>
              </li>
              <li>
                <button onClick={() => handleScroll("about")} className="text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-blue-600 font-semibold">
                  About
                </button>
              </li>
              <li>
                <button onClick={() => handleScroll("contact")} className="text-gray-600 text-sm xl:text-base py-1 px-2 xl:px-3 hover:text-blue-600 font-semibold">
                  Contact
                </button>
              </li>
            </ul>
          </div>



          {/* Profile Dropdown / Login & Register Buttons */}
       
          <div className="hidden lg:flex items-center space-x-6">
            {user && (
              <button
                className="relative text-gray-700 hover:text-blue-600"
                onClick={() => navigate("/cart")}
              >
                <MdShoppingCart size={28} />
              </button>
            )}
            {user ? (
              <div className="relative inline-block">
                <button className="flex items-center gap-2 text-gray-700 font-semibold bg-gray-200 rounded-full px-4 py-2 hover:bg-gray-300"
                  onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                >
                  <span>{user.username}</span>
                </button>
                {isDropdownOpen && (
                  <div className="absolute right-0 mt-2 w-56 bg-white border rounded-lg shadow-lg z-50">
                    <ul className="py-2">
                      <li className="px-4 py-2 text-gray-700">
                        <p className="font-semibold truncate">{user.username}</p>
                        <p className="text-sm text-gray-500 truncate">{user.email}</p>
                        <p className="text-sm text-gray-500 truncate">{user.phone}</p>
                      </li>
                      <hr />
                      <li>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={() => setIsEditPopupOpen(true)}
                        >
                          Edit Profile
                        </button>
                      </li>
                      <li>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={handleChangePassword}
                        >
                          Change Password
                        </button>
                      </li>
                      <li>
                        <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                          onClick={handleLogout}
                        >
                          Logout
                        </button>
                      </li>
                    </ul>
                  </div>
                )}
              </div>
            ) : (
              <>
                <Link to="/login">
                  <button className="font-semibold">Sign in</button>
                </Link>
                <Link to="/register">
                  <button className="text-white bg-blue-600 font-semibold rounded-full px-6 py-2 hover:bg-blue-700">
                    Register
                  </button>
                </Link>
              </>
            )}
          </div>
        </div>
      </motion.div>
      {isEditPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <input type="text" name="username" placeholder="Username" className="w-full px-3 py-2 border rounded mb-2"
              value={editForm.username} onChange={handleEditChange} />
            <input type="email" name="email" placeholder="Email" className="w-full px-3 py-2 border rounded mb-2"
              value={editForm.email} onChange={handleEditChange} />
            <input type="text" name="phone" placeholder="Phone Number" className="w-full px-3 py-2 border rounded mb-2"
              value={editForm.phone} onChange={handleEditChange} />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditPopupOpen(false)} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default Navbar;
