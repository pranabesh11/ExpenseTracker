import React from "react";
import { Outlet } from "react-router-dom";

const MainLayout: React.FC = () => {
  return (
    <div>
      <header>Navbar</header>
      <aside>Sidebar</aside>

      <main>
        <Outlet />
      </main>
    </div>
  );
};

export default MainLayout;