import React from "react";
import "./LoadingFallback.css"; // Import stylesheet

const LoadingFallback = () => {
  return (
    <div className="loader">
      <div className="inner one"></div>
      <div className="inner two"></div>
      <div className="inner three"></div>
    </div>
  );
};

export default LoadingFallback;
