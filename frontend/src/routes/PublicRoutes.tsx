import { Routes, Route } from "react-router-dom";
import React from "react";

import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AuthLayout from "../layout/AuthLayout";
import EmailVerification from "../pages/auth/EmailVerification";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";

const PublicRoutes: React.FC = () => {
  return (
    <Routes>
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="emailverify" element={<EmailVerification/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;