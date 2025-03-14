import React from "react";
import { useSelector } from "react-redux";
import { Navigate, useLocation, Outlet } from "react-router-dom";
import { useGetMeQuery } from "@/redux/api/userApi";
import LoadingSpinner from "@/components/layout/spinner/LoadingSpinner";

const ProtectedRoutes = ({ children, adminOnly = false }) => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const { isLoading } = useGetMeQuery();
  const location = useLocation();

  if (isLoading) {
    return <LoadingSpinner />;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (adminOnly) {
    const isAdminOrEmployee = ["admin", "employee", "superAdmin"].includes(
      user?.role
    );
    if (!isAdminOrEmployee) {
      return <Navigate to="/" replace />;
    }
  }

  // Return children if provided, otherwise return Outlet for nested routes
  return children || <Outlet />;
};

export default ProtectedRoutes;
