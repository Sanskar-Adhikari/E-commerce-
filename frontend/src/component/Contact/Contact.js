import React from 'react'
import './contact.css'
const Contact = () => {
  return (
    <div className='whole'>
    <section id="contact">
  <div class="contact-box">
    <div class="contact-links">
      <h2>CONTACT ME</h2>
      <div class="links">
  <div class="link">
    <a href='https://www.linkedin.com/'><img src="https://i.postimg.cc/m2mg2Hjm/linkedin.png" alt="linkedin"/></a>
  </div>
  <div class="link">
    <a href='https://github.com/'><img src="https://i.postimg.cc/YCV2QBJg/github.png" alt="github" /></a>
  </div>
  <div class="link">
    <a href='gmail.com'><img src="https://i.postimg.cc/NjLfyjPB/email.png" alt="email" /></a>
  </div>
</div>

    </div>
    <div class="contact-form-wrapper">
    <form action="mailto:seniorproject.sp23@gmail.com" method="post" encType="text/plain">
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
  )
}

export default Contact