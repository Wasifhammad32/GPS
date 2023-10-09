import React from "react";
import "../App.css";
import SideNavbar from "./SideNavbar";

const Layout = ({ children }) => {
  return (
    <div className="flex">
      <div className="md:flex-[6%] xxxs:w-14 lg:w-10">
        <SideNavbar />
      </div>
      <div style={{ flex: "94%" }}>{children}</div>
    </div>
  );
};

export default Layout;
