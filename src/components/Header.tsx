import React from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Link, useLocation, redirect, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../styles/App.css";
import "../styles/Header.css";
import AppLogo from "./AppLogo";
import Settings from "./Settings";
import { APPMODE, setAppMode } from "../redux/feautures/appStateSlice";

const Header: React.FC = () => {
  const appMode = useAppSelector((state) => state.appState.appMode);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const handleModeChange = (mode: APPMODE) => {
    navigate("/");
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

              <div className="nav-buttons">
                <a
                  className={`nav-button ${(appMode === APPMODE.R2K && location.pathname === "/") ? "active" : ""}`}
                  onClick={() => handleModeChange(APPMODE.R2K)}
                >
                  R2K
                </a>
                <a
                  className={`nav-button ${(APPMODE.K2R && location.pathname === "/") ? "active" : ""}`}
                  onClick={() => handleModeChange(APPMODE.K2R)}
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

            <div className="mode-switch-right">
              <Link to="/profile" className={`nav-button`}  id="profile-button">
              <FontAwesomeIcon icon={faUser} className={`settings-button ${(location.pathname.includes("/profile")) ? "active" : ""}`}size="xl" />
              </Link>
            <Settings />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
