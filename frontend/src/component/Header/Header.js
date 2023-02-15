import React, { useState, useEffect } from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import './Header.css';

function HamburgerOverlay() {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    const section = document.querySelector('.back');

    if (isOpen) {
      section.style.transition = 'background 1s ease-in-out';
      section.style.background = 'linear-gradient(to bottom, #1abc9c, #ffffff)';
      document.body.style.overflow = 'hidden';
    } else {
      section.style.background = 'white';
      document.body.style.overflow = 'auto';
    }
  }, [isOpen]);

  return (
    <section className="back">
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={handleToggle} />
      </div>
      {isOpen && (
        <div onClick={handleToggle}>
          <div className="container">
            <div className="overflow-hidden">
              <h1 className="header drop-in">Welcome Back!!</h1>
            </div>
            <div className="overflow-hidden">
              <nav className="drop-in-2 navbar">
                <ul className="navbar-menu">
                  <li className="navbar-item"><a href="/">Home</a></li>
                  <li className="navbar-item"><a href="/products">Products</a></li>
                  <li className="navbar-item"><a href="/contact">Contact</a></li>
                  <li className="navbar-item"><a href="/about">About</a></li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}

export default HamburgerOverlay;
