import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const token = localStorage.getItem("authToken");

  if (!token) {
    window.alert("Please login"); // Alert the user before redirecting
    return <Navigate to="/" />;
  }

  return children;
};

export default ProtectedRoute;
