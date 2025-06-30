import React, { useContext, useState } from 'react';
import { FaBars, FaBox, FaCartShopping, FaHouse, FaPhone, FaRing, FaUserPlus } from 'react-icons/fa6';
import { Link, useNavigate } from 'react-router-dom';
import { UserContext } from "../../context/UserContext";
import Contacts from './Contacts';
import DashboardHome from './dashboardHome';
import Orders from './Orders';
import Products from './Products';
import Story from './Story';
import Users from './users';

const Dashboard = () => {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [activeMenu, setActiveMenu] = useState('dashboard');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isEditPopupOpen, setIsEditPopupOpen] = useState(false);
  const { user, logout, setUser } = useContext(UserContext);
  const navigate = useNavigate();

  // State for Profile Editing
  const [editForm, setEditForm] = useState({
    username: user?.username || "",
    email: user?.email || "",
    phone: user?.phone || "",
  });
  const [error, setError] = useState("");

  // Sidebar menu items
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: <FaHouse /> },
    { id: 'products', label: 'Venues', icon: <FaBox /> },
    { id: 'orders', label: 'Orders', icon: <FaCartShopping /> },
    { id: 'users', label: 'Users', icon: <FaUserPlus /> },
    { id: 'contacts', label: 'Contacts', icon: <FaPhone /> },
    { id: 'story', label: 'Story', icon: <FaRing /> },
  ];

  // Function to update user details
  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
    setError(""); // Clear error when user types
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

  // Save Updated Profile
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

  // Logout Function
  const handleLogout = () => {
    logout();
    navigate("/login"); // Redirect to login after logout
  };

  // Render content based on active menu
  const renderContent = () => {
    switch (activeMenu) {
      case 'dashboard': return <DashboardHome />;
      case 'products': return <Products />;
      case 'orders': return <Orders />;
      case 'users': return <Users />;
      case 'contacts': return <Contacts />;
      case 'story': return <Story />;
      default: return null;
    }
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white p-4 shadow-md flex justify-between items-center sticky top-0 z-30">
        <div className="flex items-center space-x-4">
          <button onClick={() => setSidebarOpen(!sidebarOpen)} className="text-gray-500 md:hidden">
            <FaBars size={24} />
          </button>
          <Link to="/"><h1 className="text-xl font-bold">Sajilo<span className="text-blue-600">Bihe</span></h1></Link>
        </div>

        {/* Profile Section */}
        <div className="relative">
          {user ? (
            <button
              className="flex items-center gap-2 text-gray-700 font-semibold bg-gray-200 rounded-full px-4 py-2 hover:bg-gray-300"
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <span>{user.username}</span>
            </button>
          ) : (
            <button className="text-gray-600 font-semibold" onClick={() => navigate('/login')}>Login</button>
          )}
          {isDropdownOpen && (
            <div className="absolute right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg z-50">
              <ul className="py-2">
                <li className="px-4 py-2 text-gray-700">
                  <p className="font-semibold">{user?.username}</p>
                  <p className="text-sm text-gray-500">{user?.email}</p>
                </li>
                <hr />
                <li>
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100"
                    onClick={() => { setIsEditPopupOpen(true); setIsDropdownOpen(false); }}>
                    Edit Profile
                  </button>
                </li>
                <li>
                  <button className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100" onClick={handleLogout}>
                    Logout
                  </button>
                </li>
              </ul>
            </div>
          )}
        </div>
      </header>

      <div className="flex flex-grow">
        {/* Sidebar */}
        <aside className={`bg-white w-64 p-6 mt-16 fixed top-0 left-0 h-full z-20 transform transition-transform ${
          sidebarOpen ? 'translate-x-0' : '-translate-x-full'
        } md:translate-x-0 shadow-lg`}>
          <ul className="space-y-4">
            {menuItems.map((menu) => (
              <li key={menu.id} onClick={() => setActiveMenu(menu.id)}
                className={`flex items-center space-x-2 cursor-pointer p-2 rounded-lg ${
                  activeMenu === menu.id ? 'bg-gray-200' : 'hover:bg-gray-100'
                }`}>
                <span>{menu.icon}</span>
                <span className="text-gray-600 font-medium">{menu.label}</span>
              </li>
            ))}
          </ul>
        </aside>

        {/* Content */}
        <main className="flex-grow p-6 ml-0 md:ml-64">{renderContent()}</main>
      </div>

      {/* Edit Profile Popup */}
      {isEditPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-96">
            <h2 className="text-xl font-semibold mb-4">Edit Profile</h2>
            {error && <p className="text-red-500 text-sm text-center mb-2">{error}</p>}
            <input type="text" name="username" value={editForm.username} onChange={handleEditChange} className="border p-2 w-full mb-2" />
            <input type="email" name="email" value={editForm.email} onChange={handleEditChange} className="border p-2 w-full mb-2" />
            <input type="text" name="phone" value={editForm.phone} onChange={handleEditChange} className="border p-2 w-full mb-2" />
            <div className="flex justify-end gap-2">
              <button onClick={() => setIsEditPopupOpen(false)} className="bg-gray-400 px-4 py-2 rounded">Cancel</button>
              <button onClick={handleSave} className="bg-blue-600 text-white px-4 py-2 rounded">Save</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;






