import React from 'react';
import './Footer.css';
import { faFacebook, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

function Footer() {
  return (
    <footer className="footer-distributed">

      <div className="footer-left">

        <h3>Buy, Sell, <span>Giveaway</span></h3>

        <p className="footer-links">
          <a href="/" className="link-1">Home</a>
          
          <a href="/products">Products</a>
        
        
          <a href="/contact">Contacts</a>
          
          <a href="/about">About</a>
          
        </p>

        <p className="footer-company-name">Copyright © 2023</p>
      </div>

      <div className="footer-center">

        <div>
          <i className="fa fa-map-marker"></i>
          <p><span>505 Ramapo Valley Road</span> Mahwah, New Jersey</p>
        </div>

        <div>
          <i className="fa fa-phone"></i>
          <p>+1 (201) 684-7500 </p>
        </div>

        <div>
          <i className="fa fa-envelope"></i>
          <p ><a className='para' href="mailto:seniorproject.sp23@gmail.com">seniorproject.sp23@gmail.com</a></p>
        </div>

      </div>

      <div className="footer-right">

        <p className="footer-company-about">
          <span>About the company</span>
          Buy, sell giveaway is a startup campaign for and by the students
        </p>

        <div className="footer-icons">

        <a href="https://www.google.com/"><FontAwesomeIcon icon={faFacebook} /></a>
        <a href="https://www.google.com/"><FontAwesomeIcon icon={faTwitter} /></a>
        <a href="https://www.google.com/"><FontAwesomeIcon icon={faInstagram} /></a>
   

        </div>

      </div>

    </footer>
  );
}

export default Footer;
