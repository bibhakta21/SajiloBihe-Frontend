import { useContext } from "react";
import { Navigate } from "react-router-dom";
import { UserContext } from "./UserContext";

const AdminRoute = ({ children }) => {
  const { user } = useContext(UserContext);

  // If the user is not logged in or is not an admin, redirect to home
  return user && user.role === "admin" ? children : <Navigate to="/" />;
};

export default AdminRoute;
