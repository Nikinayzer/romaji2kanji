import "../styles/App.css";
import "../styles/Header.css";
import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { setAppMode } from "../redux/actions";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faGear } from "@fortawesome/free-solid-svg-icons";

import AppLogo from "./AppLogo";

function Header() {
  const appMode = useSelector((state) => state.appMode);
  const dispatch = useDispatch();
  const location = useLocation();

  const handleModeChange = (mode) => {
    dispatch(setAppMode(mode));
  };

  return (
    <header className="app-header">
      <AppLogo />
      <div className="mode-switch">
        {location.pathname === "/faq" ? ( // Render "Back to App" link only on FAQ page
          <Link to="/" className="nav-button">
            <FontAwesomeIcon icon={faArrowLeft} /> Back to App
          </Link>
        ) : (
          <>
            <a
              className={`nav-button ${appMode === "r2k" ? "active" : ""}`}
              onClick={() => handleModeChange("r2k")}
            >
              R2K
            </a>
            <a
              className={`nav-button ${appMode === "k2r" ? "active" : ""}`}
              onClick={() => handleModeChange("k2r")}
            >
              K2R
            </a>
            <Link
              to="/faq"
              className={`nav-button ${
                location.pathname === "/faq" ? "active" : ""
              }`}
            >
              FAQ
            </Link>
          </>
        )}
        {/**<a className={`nav-button`}>Romaji rules</a>*/}
      </div>
      {/** 
            <div className='settings-container'>
            <FontAwesomeIcon icon={faGear} />
            </div>
            */}
    </header>
  );
}

export default Header;
