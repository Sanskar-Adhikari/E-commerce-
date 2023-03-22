import React from "react";
import "./contact.css";


/**/
/*
Contact()
NAME
    Contact
SYNOPSIS
    Contact();
DESCRIPTION
    This component is responsible for rendering the Contact section of the website. It includes 
    a contact form as well as links to LinkedIn, GitHub and email.
RETURNS
    Returns the JSX elements to render the Contact section.
*/
/**/
const Contact = () => {
  return (
    <div className="whole">
      <section id="contact">
        <div class="contact-box">
          <div class="contact-links">
            <h2>CONTACT ME</h2>
            <div class="links">

              {/* Links to LinkedIn, Github, and Email */}
              <div class="link">
                <a href="https://www.linkedin.com/">
                  <img
                    src="https://i.postimg.cc/m2mg2Hjm/linkedin.png"
                    alt="linkedin"
                  />
                </a>
              </div>
              <div class="link">
                <a href="https://github.com/">
                  <img
                    src="https://i.postimg.cc/YCV2QBJg/github.png"
                    alt="github"
                  />
                </a>
              </div>
              <div class="link">
                <a href="gmail.com">
                  <img
                    src="https://i.postimg.cc/NjLfyjPB/email.png"
                    alt="email"
                  />
                </a>
              </div>
            </div>
          </div>
          <div class="contact-form-wrapper">

        {/* Contact form with Name, Email and Message fields */}
            <form
              action="mailto:seniorproject.sp23@gmail.com"
              method="post"
              encType="text/plain"
            >
              <div class="form-item">
                <input type="text" name="sender" required />
                <label>Name:</label>
              </div>
              <div class="form-item">
                <input type="text" name="email" required />
                <label>Email:</label>
              </div>
              <div class="form-item">
                <textarea class="" name="message" required></textarea>
                <label>Message:</label>
              </div>
              <button class="submit-btn">Send</button>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
};
/* Contact(); */

export default Contact;
