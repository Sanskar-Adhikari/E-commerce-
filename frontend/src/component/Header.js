import React, { useState } from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import './Header.css';
function HamburgerOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
    <div className="hamburger-wrapper">
      <Hamburger toggled={isOpen} toggle={handleToggle} />
    </div>
    {isOpen && (
      <div className="overlay" onClick={handleToggle}>
        <div className="container">
 <div className="overflow-hidden">
  <h1 className="header drop-in">Welcome Back!!</h1>
 </div>
 <div className="overflow-hidden">
<nav className="drop-in-2 navbar">
  <ul className="navbar-menu">
    <li className="navbar-item"><a href="#">Home</a></li>
    <li className="navbar-item"><a href="#">About</a></li>
    <li className="navbar-item"><a href="#">Contact</a></li>
  </ul>
</nav>

 </div>
</div>
      </div>
    )}
  </>
  );
}

export default HamburgerOverlay;
