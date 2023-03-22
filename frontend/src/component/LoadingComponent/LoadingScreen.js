import React from 'react'
import "./LoadingScreen.css"


/**/
/*
LoadingScreen
NAME
    LoadingScreen
SYNOPSIS
    LoadingScreen()
DESCRIPTION
    A component that displays a loading screen.
RETURNS
    Returns the JSX for the loading screen component.
*/
/**/
const LoadingScreen = () => {
  return (
    // This component renders a loading spinner with a "Loading..." message
    <div className="load">
    <div className="loading-container">
      <div className="loader"></div>
      <h1>Loading...</h1>
    </div>
    </div>
  )
}
/* LoadingScreen() */

export default LoadingScreen;
