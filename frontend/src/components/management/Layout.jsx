import React from "react";
import Header from "./Header"; // Adjust the relative path accordingly
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      <Header />
      <main className="flex-grow overflow-y-auto">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
