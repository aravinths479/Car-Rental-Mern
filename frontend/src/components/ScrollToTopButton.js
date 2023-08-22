import React, { useState, useEffect } from "react";
import "./scrollButton.css";

const ScrollToTopButton = () => {
  const [showButton, setShowButton] = useState(false);

  // Function to handle scroll event
  const handleScroll = () => {
    if (window.scrollY > 100) {
      setShowButton(true);
    } else {
      setShowButton(false);
    }
  };

  // Function to scroll to the top of the page
  const scrollToTop = () => {
    if ("scrollBehavior" in document.documentElement.style) {
      window.scrollTo({
        top: 0,
        behavior: "smooth",
      });
    } else {
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }
  };

  // Add scroll event listener and cleanup on component mount
  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div className="scroll-to-top-container">
      {showButton && (
        <button type="button" className="btn btn-primary" style={{borderRadius : "10px"}} onClick={scrollToTop}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="16"
            height="26"
            fill="currentColor"
            className="bi bi-arrow-90deg-up"
            viewBox="0 0 16 16"
          >
            <path
              fillRule="evenodd"
              d="M4.854 1.146a.5.5 0 0 0-.708 0l-4 4a.5.5 0 1 0 .708.708L4 2.707V12.5A2.5 2.5 0 0 0 6.5 15h8a.5.5 0 0 0 0-1h-8A1.5 1.5 0 0 1 5 12.5V2.707l3.146 3.147a.5.5 0 1 0 .708-.708l-4-4z"
            />
          </svg>
        </button>
      )}
    </div>
  );
};

export default ScrollToTopButton;
