import { Routes, Route } from "react-router-dom";
import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import Login from "../pages/auth/Login";
import Signup from "../pages/auth/Signup";
import AuthLayout from "../layout/AuthLayout";
import EmailVerification from "../pages/auth/EmailVerification";
import ForgotPassword from "../pages/auth/ForgotPassword";
import ResetPassword from "../pages/auth/ResetPassword";
import NotFound from "../pages/NotFound";
import Landing from "../pages/dashboard/Landing";


const PublicRoutes: React.FC = () => {
  const { user, loading } = useContext(AuthContext);
if (loading) {
    return <div>Loading...</div>;
}
if (user) {
    return <Navigate to="/app/dashboard" replace />;
}
  return (
    <Routes>
      <Route path="/" element={<Landing /> } />
      <Route element={<AuthLayout />}>
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />
        <Route path="emailverify" element={<EmailVerification/>}/>
        <Route path="forgot-password" element={<ForgotPassword/>}/>
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
};

export default PublicRoutes;