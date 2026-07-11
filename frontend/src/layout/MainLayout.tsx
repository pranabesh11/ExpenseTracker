import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";


const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />
      <div className="layout">
        <Sidebar />
        <main>
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;