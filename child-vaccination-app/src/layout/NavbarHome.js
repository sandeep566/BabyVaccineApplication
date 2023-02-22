import '../styles/Navbar.css';
import React from 'react';
import { FaBars } from 'react-icons/fa';

function NavbarHome(){
    return (
        <nav className="navbar">
          <div className="navbar__logo">BABY VACCINE APPLICATION</div>
          <FaBars className="navbar__hamburger" />
        </nav>
  );
}

export default NavbarHome;