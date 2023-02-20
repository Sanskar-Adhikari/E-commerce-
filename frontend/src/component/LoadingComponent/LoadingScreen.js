import React from 'react'
import "./LoadingScreen.css"


const LoadingScreen = () => {
  return (
    <div className="load">
    <div className="loading-container">
      <div className="loader"></div>
      <h1>Loading...</h1>
    </div>
    </div>
  )
}

export default LoadingScreen;
