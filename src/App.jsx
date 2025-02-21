import React from "react";
import { Toaster } from "react-hot-toast";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

import Footer from "./components/Footer/Footer";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import Register from "./components/Register/Register";


const AppContent = () => {
 
 

  return (
    <main className="overflow-x-hidden">
    <Toaster position="top-right" reverseOrder={false} />
    <Navbar />
      <Routes>
        <Route path="/login" element={authRedirect(<Login />)} />
        <Route path="/register" element={authRedirect(<Register />)} />
      </Routes>
     <Footer />
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
