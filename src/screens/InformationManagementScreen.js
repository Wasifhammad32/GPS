import React from "react";
import window from "../images/window.png";
import { Link } from "react-router-dom";

const InformationManagementScreen = () => {
  return (
    <div className="w-[100%] h-[100vh] p-5">
      <Link to="/vehicletracking">
        <div className="p-2 lg:w-36 lg:h-40">
          <div className="lg:h-16 lg:w-16 mx-auto">
            <img className="" src={window} alt="screen" />
          </div>
          <p className="text-center pt-2">Vehicle Tracking List</p>
        </div>
      </Link>
    </div>
  );
};

export default InformationManagementScreen;
