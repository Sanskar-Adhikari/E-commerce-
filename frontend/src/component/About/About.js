import React from 'react'
import "./about.css"


/**/
/*
About()
NAME
    About - Generates and returns the Javascript JSX for the author's profile information.
SYNOPSIS
    About();
    No props passed.
DESCRIPTION
    It generates the JSX for the author's profile page that includes a brief introduction about the author,
    the motivation behind creating the senior project and the purpose of the application.
RETURNS
    Returns the Javascript JSX for the About page of the application
*/
/**/
const About = () => {
  return (
    <div class="wrapper">
      {/* Name section */}
      <div class="name">
        Sanskar
      </div>

      {/* Content section */}
      <div class="content">
        {/* Heading */}
        <h2 className='heading'>About me</h2>
  
        {/* Introduction */}
        <p>Hello everyone! I am Sanskar Adhikari and this is my senior project</p>
        <br></br>
        <p>As a college student, I have personally experienced the challenges of finding affordable ways to buy and sell items, as well as the difficulties of trying to give away items that are no longer needed. </p>
        <p>This inspired me to create a platform that addresses these issues and provides a space for students to easily and safely buy, sell, and give away items to their peers.</p>
        <br></br>
        <p>My senior project is a reflection of my passion for solving problems and my desire to create something that will make a positive impact on my community. I am excited to see this project come to fruition and to provide a valuable resource for college students like myself.</p>
      </div>
    </div>
  );
  
}
/* About(); */

export default About