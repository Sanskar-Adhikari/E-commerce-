import React from "react";
import "./Footer.css";
import {
  faFacebook,
  faTwitter,
  faInstagram,
} from "@fortawesome/free-brands-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

/**/
/*
Footer()
NAME
    Footer
SYNOPSIS
    Footer();
DESCRIPTION
    This component renders the website footer, including company information, contact information, and social media links.
RETURNS
    A JSX element that represents the website footer.
*/
/**/
function Footer() {
  return (
    <footer className="footer-distributed">

      {/* Footer left section */}
      <div className="footer-left">
        <h3>
          Buy, Sell, <span>Giveaway</span>
        </h3>

        {/* Footer links */}
        <p className="footer-links">
          <a href="/" className="link-1">
            Home
          </a>

          <a href="/products">Products</a>

          <a href="/contact">Contacts</a>

          <a href="/about">About</a>
        </p>

        {/* Footer company details */}
        <p className="footer-company-name">Copyright © 2023</p>
      </div>

      {/* Footer center section */}
      <div className="footer-center">

        {/* Footer address */}
        <div>
          <i className="fa fa-map-marker"></i>
          <p>
            <span>505 Ramapo Valley Road</span> Mahwah, New Jersey
          </p>
        </div>

        {/* Footer phone number */}
        <div>
          <i className="fa fa-phone"></i>
          <p>+1 (201) 684-7500 </p>
        </div>

        {/* Footer email. */}
        <div>
          <i className="fa fa-envelope"></i>
          <p>
            <a className="para" href="mailto:seniorproject.sp23@gmail.com">
              seniorproject.sp23@gmail.com
            </a>
          </p>
        </div>
      </div>

      {/* Footer right section */}
      <div className="footer-right">
        
        {/* Footer company description */}
        <p className="footer-company-about">
          <span>About the company</span>
          Buy, sell giveaway is a startup campaign for and by the students
        </p>

        {/* Footer social media icons */}
        <div className="footer-icons">
          <a href="https://www.facebook.com/">
            <FontAwesomeIcon icon={faFacebook} />
          </a>
          <a href="https://www.twitter.com/">
            <FontAwesomeIcon icon={faTwitter} />
          </a>
          <a href="https://www.instagram.com/">
            <FontAwesomeIcon icon={faInstagram} />
          </a>
        </div>
      </div>
    </footer>
  );
}
/* Footer(); */

export default Footer;
