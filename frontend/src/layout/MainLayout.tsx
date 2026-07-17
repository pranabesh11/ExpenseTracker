import React from "react";
import { Outlet } from "react-router-dom";
import Navbar from "./Navbar";
import Sidebar from "./Sidebar";

const MainLayout: React.FC = () => {
  return (
    <>
      <Navbar />

      <div
        style={{
          display: "flex",
          height: "calc(100vh - 64px)",
          overflow: "hidden"
        }}
      >
        <div
          className="sidebar-container"
          style={{border:"1px solid red"}}
        >
          <Sidebar />
        </div>

        <main
          style={{
            flex: 1,
            border: "1px solid red"
          }}
        >
          <Outlet />
        </main>
      </div>
    </>
  );
};

export default MainLayout;