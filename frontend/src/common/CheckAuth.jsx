import React from "react";
import { Navigate, Outlet, useLocation } from "react-router-dom";

function CheckAuth({ isAuthenticated, user }) {
  const location = useLocation();

  const isLoginOrRegister =
    location.pathname.includes("/login") ||
    location.pathname.includes("/register");

  if (!isAuthenticated && !isLoginOrRegister) {
    return <Navigate to="/auth/login" />;
  }

  if (isAuthenticated && isLoginOrRegister) {
    return <Navigate to={user?.role === "admin/" ? "/admin" : "/travel/home"} />;
  }

  if (
    isAuthenticated &&
    user?.role !== "admin" &&
    location.pathname.includes("/admin")
  ) {
    return <Navigate to="/unauth-page" />;
  }

  if (
    isAuthenticated &&
    user?.role === "admin" &&
    location.pathname.includes("/travel")
  ) {
    return <Navigate to="/admin" />;
  }

  return <Outlet />;
}

export default CheckAuth;
