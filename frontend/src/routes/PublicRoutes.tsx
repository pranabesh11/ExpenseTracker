import { Routes, Route } from "react-router-dom";
import React from "react";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AuthLayout from "../layout/AuthLayout";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;