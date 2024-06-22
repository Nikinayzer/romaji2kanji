import React from "react";
import "../../styles/Footer.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGithub, faInstagram } from "@fortawesome/free-brands-svg-icons";
import { faLanguage } from "@fortawesome/free-solid-svg-icons";

const Footer:React.FC = () => {
  return (
    <footer className="footer">
      <div className="container">
        <p className="footer-text">
          By n1ckor with love |{" "}
          <a
            href="https://github.com/nikinayzer/romaji2kanji"
            target="_blank"
            rel="noopener noreferrer"
          >
            Version 1.0
          </a>
        </p>
        <div className="social-links">
          <a
            href="https://github.com/nikinayzer"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FontAwesomeIcon icon={faGithub} className="social-icon" />
          </a>
          <a
            href="https://instagram.com/n1ckor"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FontAwesomeIcon icon={faInstagram} className="social-icon" />
          </a>
          <a
            href="https://www.duolingo.com/profile/N1ckor"
            target="_blank"
            rel="noopener noreferrer"
            className="social-link"
          >
            <FontAwesomeIcon icon={faLanguage} className="social-icon" />
          </a>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
