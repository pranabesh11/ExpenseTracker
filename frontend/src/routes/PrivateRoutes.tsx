import React, { useContext } from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layout/MainLayout";
import { menuItems } from "../pages/dashboard/MenuItems";
import { AuthContext } from "../context/AuthContext";
import NotFound from "../pages/NotFound";


const PrivateRoutes: React.FC = () => {
  const { user, loading } = useContext(AuthContext);
  if(loading){
    return <div>Loading ....</div>
  }
  if(!user){
    return <Navigate to="/login" replace/>
  }
  return(
    <Routes>
      <Route element={<MainLayout />}>
        {menuItems.map((item) => (
          <Route
              key={item.key}
              path={item.key.replace("/", "")}
              element={item.element}
            />
        ))}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  )
};

export default PrivateRoutes;