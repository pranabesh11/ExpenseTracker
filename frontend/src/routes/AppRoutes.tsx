import { BrowserRouter, Routes, Route } from "react-router-dom";
import React from "react";

import PublicRoutes from "./PublicRoutes";
import PrivateRoutes from "./PrivateRoutes";

const AppRoutes: React.FC = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/*" element={<PublicRoutes />} />
        <Route path="/app/*" element={<PrivateRoutes />} />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;