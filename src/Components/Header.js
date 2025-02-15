import React from 'react';
import { NavLink } from 'react-router-dom';

export default function Header() {
  return (
    <nav className="navbar navbar-default">
      <div className="container-fluid">
        <div className="navbar-header">
        <NavLink to="/" className="navbar-brand">WebSiteName</NavLink>

        </div>
        <ul className="nav navbar-nav">
          <li>
            <NavLink to="/" className={({ isActive }) => isActive ? "active" : ""}>Home</NavLink>
          </li>
          <li>
            <NavLink to="/contact" className={({ isActive }) => isActive ? "active" : ""}>Contact Us</NavLink>
          </li>
  
        </ul>
      </div>
    </nav>
  );
}
