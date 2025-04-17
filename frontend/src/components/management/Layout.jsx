import React from "react";
import Header from "./Header"; // Adjust the relative path accordingly
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <div className="flex flex-col bg-white overflow-hidden ">
      <Header />
      <main className="flex flex-col w-full mt-20">
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
