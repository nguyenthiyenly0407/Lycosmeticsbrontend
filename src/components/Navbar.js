import React from 'react';
import { Link, useLocation } from 'react-router-dom'; // Import useLocation hook
import { SidebarData } from './SidebarData';
import './Navbar.css';

function Navbar() {
  const location = useLocation(); // Get the current location/path
  
  return (
    <div className="navbar">
      <ul className="nav-menu-items">
        {SidebarData.map((item, index) => {
          // Check if the current path matches the item path
          const isActive = location.pathname === item.path;

          return (
            <li key={index} className={isActive ? 'nav-text active' : 'nav-text'}>
              <Link to={item.path}>
                {item.icon}
                <span>{item.title}</span>
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Navbar;
