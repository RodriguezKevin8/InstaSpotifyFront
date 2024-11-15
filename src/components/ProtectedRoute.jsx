// src/components/ProtectedRoute.js
import React from "react";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children }) => {
  const user = JSON.parse(localStorage.getItem("user"));

  // Si no existe un usuario en localStorage, redirige al inicio de sesión
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Si existe el usuario, renderiza el componente hijo
  return children;
};

export default ProtectedRoute;
