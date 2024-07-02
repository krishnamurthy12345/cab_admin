import React from "react";
import "../styles/dashboard.css";
import MileChart from "../charts/MileChart";
const UserData = () => {
    return (
      <div className="dashboard">
        <div className="div1">
          <MileChart/>
          </div>
      </div>
    );
  };
  
  export default UserData;