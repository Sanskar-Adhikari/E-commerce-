import React, { useState, useEffect } from 'react';
import { Fade as Hamburger } from 'hamburger-react';
import './Header.css';
function HamburgerOverlay() {
const [isOpen, setIsOpen] = useState(false);
const handleToggle = () => {
setIsOpen(!isOpen);
};
useEffect(() => {
if (isOpen) {
const section = document.querySelector('.back');
section.style.transition = 'background 1.3s ease-in-out';
section.style.background = 'linear-gradient(43deg, #4158D0 0%, #C850C0 46%, #FFCC70 100%)';
} else {
const section = document.querySelector('.back');
section.style.transition = 'background 1.3s ease-in-out';
section.style.background = 'white';
}
}, [isOpen]);
return (
<section className="back" >
   <div>
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
   </div>
</section>
);
}
export default HamburgerOverlay;