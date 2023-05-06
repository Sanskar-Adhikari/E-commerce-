import React, { useState, useEffect, useRef } from "react";
import { Fade as Hamburger } from "hamburger-react";
import "./Header.css";

/**/
/*
HamburgerOverlay()
NAME
    HamburgerOverlay
SYNOPSIS
    HamburgerOverlay();
DESCRIPTION
    This component renders a hamburger menu overlay that appears when the user clicks on the hamburger icon.
     It uses state to toggle the menu open and closed, and useEffect to update the styles and behavior of the page when the menu 
     is open or closed.
RETURNS
    The HamburgerOverlay component.
*/
/**/

function HamburgerOverlay() {

  // Initialize state variables
  const [isOpen, setIsOpen] = useState(false);

  // Create a reference to the section element
  const backRef = useRef(null);

  // Define a function to handle the hamburger toggle button click
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Use the useEffect hook to update the page layout when the isOpen state changes
  useEffect(() => {
    const section = backRef.current;

    if (isOpen) {
      // If the overlay is open, set the section background to a gradient
      section.style.transition = "background 1s ease-in-out";
      section.style.background = "linear-gradient(to bottom, #1abc9c, #ffffff)";
      
      // Hide the body overflow so the page doesn't scroll
      document.body.style.overflow = "hidden";
      
      // Scroll to the top of the section
      window.scrollTo(0, section.offsetTop);
    } else {
      // If the overlay is closed, set the section background to white
      section.style.background = "white";
      
      // Restore the body overflow
      document.body.style.overflow = "auto";
    }
  }, [isOpen]);

  return (
    <section ref={backRef} className="back">
      <div className="hamburger">
        <Hamburger toggled={isOpen} toggle={handleToggle} />
      </div>

      {/* If the overlay is open, render the contents. */}
      {isOpen && (
        <div onClick={handleToggle}>
          <div className="container">
            <div className="overflow-hidden">
              <h1 className="header drop-in">Welcome Back!!</h1>
            </div>
            <div className="overflow-hidden">
              <nav className="drop-in-2 navbar">
                {/* navbar menu */}
                <ul className="navbar-menu">
                  <li className="navbar-item">
                    <a href="/">Home</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/products">Products</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/contact">Contact</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/about">About</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/search">Search</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/login">Login</a>
                  </li>
                  <li className="navbar-item">
                    <a href="/cart">Cart</a>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
/* HamburgerOverlay() */

export default HamburgerOverlay;
