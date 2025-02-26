import React, { useContext } from "react";
import { Toaster } from "react-hot-toast";
import { Navigate, Route, BrowserRouter as Router, Routes, useLocation } from "react-router-dom";

import Cart from "./components/cart/Cart";
import ChangePass from "./components/changepassword/ChangePass";
import ForgotPass from "./components/changepassword/ForgotPass";
import NewPass from "./components/changepassword/NewPass";
import Contact from "./components/contact/Contact";
import Dashboard from "./components/dashboard/dashboard";
import Footer from "./components/Footer/Footer";
import About from "./components/Hero/About";
import Hero from "./components/Hero/Hero";
import Login from "./components/Login/Login";
import Navbar from "./components/Navbar/Navbar";
import NumberCounter from "./components/NumberCounter/NumberCounter";
import ProductDetail from "./components/product/ProductDetail";
import Product from "./components/product/Products";
import Register from "./components/Register/Register";
import Story from "./components/Stories/Story";
import Testimonial from "./components/Testimonial/Testimonial";
import WhyChooseUs from "./components/WhyChooseUs/WhyChooseUs";
import { UserContext, UserProvider } from "./context/UserContext";
import AccessDenied from "./protected/AccessDenied";
import ProtectedRoute from "./protected/ProtectedRoute";

const AppContent = () => {
  const { user } = useContext(UserContext);
  const location = useLocation();
  const hideNavbarFooter = location.pathname === "/dashboard"; // Hide Navbar/Footer on Dashboard

  // Protected routes for authenticated users (redirect to home if logged in)
  const authRedirect = (element) => {
    return user ? <Navigate to="/" replace /> : element;
  };

  return (
    <main className="overflow-x-hidden">
    <Toaster position="top-right" reverseOrder={false} />

      {!hideNavbarFooter && <Navbar />} {/* Hide Navbar on Dashboard */}

      <Routes>
     
        {/* Public Routes */}
        <Route path="/" element={<><Hero /><NumberCounter /><About /><WhyChooseUs /><Testimonial /><Contact /></>} />
        <Route path="/stories" element={<Story />} />
        <Route path="/product" element={<Product />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/product/:id" element={<ProductDetail />} />

        {/* Authentication Routes (Redirect if user is logged in) */}
        <Route path="/login" element={authRedirect(<Login />)} />
        <Route path="/register" element={authRedirect(<Register />)} />
        <Route path="/forgotpass" element={authRedirect(<ForgotPass />)} />
        <Route path="/reset-password/:token" element={authRedirect(<NewPass />)} />

        {/* Change Password Route (Only accessible if logged in) */}
        <Route path="/changepass" element={<ChangePass />} />


        {/* Protected Admin Dashboard Route */}
        <Route element={<ProtectedRoute adminOnly={true} />}>
          <Route path="/dashboard" element={<Dashboard />} />
        </Route>

        {/* Access Denied Route */}
        <Route path="/access-denied" element={<AccessDenied />} />
      </Routes>

      {!hideNavbarFooter && <Footer />} {/* Hide Footer on Dashboard */}
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
