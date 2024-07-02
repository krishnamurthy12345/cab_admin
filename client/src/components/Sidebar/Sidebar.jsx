  import React, { useState } from "react";
  import "bootstrap/dist/css/bootstrap.min.css";
  import { Link } from "react-router-dom";
  import "bootstrap-icons/font/bootstrap-icons.css";
  import "./sidebar.css";


  const Sidebar = () => {
    const [isopen, setisopen] = useState(false);

    const toggle = () => setisopen(!isopen);

    return (
      <div>
        <div className={`sidebar__top ${isopen ? '' : 'open'}`}>
        
          <div className="sidebar d-flex flex-column justify-content-between bg-dark text-white p-4 vh-100">
            <div>
              <a href="d-flex align-items-center">
                <img src="https://einfosoft.com/templates/templatemonster/ecab/source/assets/img/logo.png" style={{height:'50px',width:"30px"}}/>
                <span className="fs-4 text-center">Co-Ride</span>
              </a>
              <span className="mor fs-5">
              
                <button className="sidebar__toggle" onClick={toggle}>
                  <i className="ri-menu-line"></i>
                </button>
              </span>
              <hr className="text-secondary" />
              <ul className="nav nav-pills link-primary flex-column p-0 m-0">
                <li className="nav-item p-1 ">
                  <Link to="/" className="nav-link text-white side">
                    <i className="bi bi-speedometer me-3 fs-5"></i>
                    <span className="fs-5 ">Dashboard</span>
                  </Link>
                </li>
                <li className="nav-item  p-1">
                  <Link to="bookings" className="nav-link text-white side">
                    <i className="bi bi-table me-3 fs-5"></i>
                    <span className="fs-5">Bookings</span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to="user" className="nav-link text-white side">
                    <i className="bi bi-people me-3 fs-5"></i>
                    <span className="fs-5">User-list</span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to="" className="nav-link text-white side">
                    <i className="bi bi-fan me-3 fs-5"></i>
                    <span className="fs-5">Trips</span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to="kjh" className="nav-link text-white side">
                    <i className="bi bi-grid me-3 fs-5"></i>
                    <span className="fs-5">Drivers</span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to="fare" className="nav-link text-white side">
                    <i className="bi bi-person me-3 fs-5"></i>
                    <span className="fs-5">Fare-Manage</span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to="li" className="nav-link text-white side">
                    <i className="bi bi-collection me-3 fs-5"></i>
                    <span className="fs-5">Coupons</span>
                  </Link>
                </li>
                <li className="nav-item p-1">
                  <Link to="kj" className="nav-link text-white side">
                    <i className="bi bi-inbox me-3 fs-5"></i>
                    <span className="fs-5">Email</span>
                  </Link>
                </li>
              </ul>
            </div>
            <div className="">
              <hr className="text-secondary " />
              <div className="side  p-1">
              <i className="ri-logout-circle-r-line  me-3 fs-5"></i> 
            
              <span className="fs-4 side">LogOut</span>
              </div>
            </div>
          </div>

        </div>
      </div>
    );
  };

  export default Sidebar;



