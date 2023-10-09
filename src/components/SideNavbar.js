import React from "react";
import { useLocation, Link } from "react-router-dom";
import logo from "../images/logo.png";
import user from "../images/user.png";
import trackingmaps from "../images/trackingmaps.png";
import window from "../images/window.png";
import file from "../images/files.png";
import report from "../images/report.png";
import power from "../images/power.png";

const SideNavbar = () => {
  const location = useLocation();
  const isLoginPage = location.pathname === "/";

  if (isLoginPage) {
    return null;
  }

  return (
    <div className="pt-5 bg-slate-50 h-full flex flex-col border-r-2 border-gray-300">
      <div className="mb-20">
        <img className="w-11 h-11 m-auto " src={logo} alt="logo" />
      </div>
      <ul className="">
        <li className="mb-4 ">
          <div className="m-1 py-2 hover:bg-green-600 hover:rounded-md">
            <img className="w-7 h-7 m-auto" src={trackingmaps} alt="screen" />
          </div>
        </li>
        <li className="mb-4">
          <Link to="/informationmanagement">
            <div className="m-1 py-2 hover:bg-green-600 hover:rounded-md">
              <img className="w-7 h-7 m-auto" src={window} alt="window" />
            </div>
          </Link>
        </li>
        <li className="mb-4">
          <div className="m-1 py-2 hover:bg-green-600 hover:rounded-md">
            <img className="w-7 h-7 m-auto" src={file} alt="file" />
          </div>
        </li>
        <li className="mb-4">
          <div className="m-1 py-2 hover:bg-green-600 hover:rounded-md">
            <img className="w-7 h-7 m-auto" src={report} alt="report" />
          </div>
        </li>
        <li className="mb-4">
          <div className="m-1 py-2 hover:bg-green-600 hover:rounded-md">
            <img className="w-7 h-7 m-auto" src={user} alt="user" />
          </div>
        </li>
        <li className="mb-4">
          <div className="m-1 py-2 hover:bg-green-600 hover:rounded-md">
            <img className="w-7 h-7 m-auto" src={power} alt="logout" />
          </div>
        </li>
      </ul>
    </div>
  );
};

export default SideNavbar;
