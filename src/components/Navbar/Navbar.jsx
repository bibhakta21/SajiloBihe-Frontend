import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import { MdMenu } from "react-icons/md";
import { useState } from "react";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);


  const handleLogout = () => {
    logout();
    navigate("/login");
  };
  
  <button onClick={() => setIsOpen(!isOpen)}>
  <MdMenu size={28} />
</button>

  return (
    
    <nav className="bg-white shadow-md p-4">
      <div className="container mx-auto flex justify-between">
        <h1 className="text-2xl font-bold">Navbar</h1>
        <div className={`lg:flex ${isOpen ? "block" : "hidden"}`}>
        <ul className="flex space-x-4">
          <li><Link to="/">Home</Link></li>
          <li><Link to="/product">Products</Link></li>
          <li><Link to="/stories">Stories</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/contact">Contact</Link></li>
        </ul>
        </div>
        <div>
          {user ? (
            <p>Welcome, {user.username}</p>
          ) : (
            <>
              <Link to="/login" className="px-4">Sign in</Link>
              <Link to="/register" className="bg-blue-600 text-white px-4 py-2 rounded">Register</Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
