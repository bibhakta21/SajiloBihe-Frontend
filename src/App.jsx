import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";


import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";
import { UserContext, UserProvider } from "./context/UserContext";

const AppContent = () => {
 
 

  return (
    <main className="overflow-x-hidden">
    <Toaster position="top-right" reverseOrder={false} />
    <Navbar />
      <Routes>
        <Route path="/login" element={authRedirect(<Login />)} />
        <Route path="/register" element={authRedirect(<Register />)} />
      </Routes>
    
    </main>
  );
};

const App = () => {
  return (
    <UserProvider>
      <Router>
        <AppContent />
      </Router>
    </UserProvider>
  );
};

export default App;
