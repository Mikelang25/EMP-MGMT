import React from "react";
import { Link } from "react-router-dom";

function NavTabs() {
    return (
      <ul className="nav nav-tabs">
        <li className="nav-item">
          <Link to="/" className={window.location.pathname === "/" ? "nav-link active" : "nav-link"}>
            Login
          </Link>
        </li>
        <li className="nav-item">
          <Link
            to="/manage"
            className={window.location.pathname === "/manage" ? "nav-link active" : "nav-link"}
          >
            Home
          </Link>
        </li>
      </ul>
    );
  }
  
  export default NavTabs;
