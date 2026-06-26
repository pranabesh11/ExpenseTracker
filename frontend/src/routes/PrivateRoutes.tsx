import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Dashboard from "../pages/dashboard/Dashboard";
import MainLayout from "../layout/MainLayout";

const isAuthenticated = (): boolean => {
//   return Boolean(localStorage.getItem("token"));
    return true;
};

const PrivateRoutes: React.FC = () => {
  if (!isAuthenticated()) {
    return <Navigate to="/login" replace />;
  }

  return (
    <Routes>
      <Route element={<MainLayout />}>
        <Route path="dashboard" element={<Dashboard />} />
      </Route>
    </Routes>
  );
};

export default PrivateRoutes;