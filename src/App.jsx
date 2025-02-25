import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";
import Contact from "./components/contact/Contact";
import Footer from "./components/Footer/Footer";
import About from "./components/Hero/About";
import Hero from "./components/Hero/Hero";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import NumberCounter from "./components/NumberCounter/NumberCounter";
import Register from "./components/Register/Register";
import Testimonial from "./components/Testimonial/Testimonial";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import { UserContext, UserProvider } from "./context/UserContext";


const AppContent = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
 

 
  const authRedirect = (element) => {
    return user ? <Navigate to="/" replace /> : element;
  };

  return (
    <main className="overflow-x-hidden">
    <Toaster position="top-right" reverseOrder={false} />

      <Navbar />

      <Routes>
        {/* Public Routes */}
        <Route path="/" element={<><Hero /><NumberCounter /><About /><WhyChooseUs /><Testimonial /><Contact /></>} />
        <Route path="/stories" element={<Story />} />
        {/* Authentication Routes (Redirect if user is logged in) */}
        <Route path="/login" element={authRedirect(<Login />)} />
        <Route path="/register" element={authRedirect(<Register />)} />
        {/* Access Denied Route */}
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
