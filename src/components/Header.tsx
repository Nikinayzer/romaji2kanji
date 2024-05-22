import React from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";

import "../styles/App.css";
import "../styles/Header.css";
import AppLogo from "./AppLogo";
import Settings from "./Settings";
import { setAppMode } from "../redux/feautures/appStateSlice";

const Header: React.FC = () => {
  const appMode = useAppSelector((state) => state.appState.appMode);
  const dispatch = useAppDispatch();
  const location = useLocation();

  const handleModeChange = (mode: string) => {
    dispatch(setAppMode(mode));
  };

  return (
    <header className="app-header">
      <AppLogo />
      <div className="header-content">
        <div className="header-text-content">
          <div className="app-logo-text">
            <h1>Romaji2kanji</h1>
          </div>
          <div className="mode-switch">
            {location.pathname === "/faq" ? (
              <Link to="/" className="nav-button">
                <FontAwesomeIcon icon={faArrowLeft} /> Back to App
              </Link>
            ) : (
              <div className="nav-buttons">
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
              </div>
            )}
            <Settings />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
