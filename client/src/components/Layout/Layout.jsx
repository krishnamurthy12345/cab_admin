import React from "react";
import Router from "../../routes/Router";
import Sidebar from "../Sidebar/Sidebar";
import TopNav from "../TopNav/TopNav";

const Layout = () => {
  return (
    <div className="layout">
        <TopNav />
    
      <div className="main__layout">
        <Sidebar />

        <div className="content">
          <Router />
        </div>
      </div>
    </div>
  );
};

export default Layout;
