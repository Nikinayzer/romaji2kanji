import React from "react";

import { useAppSelector, useAppDispatch } from "../../redux/hooks";
import { Link, useLocation, redirect, useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../../styles/app.scss";
import "../../styles/header.scss";
import AppLogo from "./AppLogo";
import Settings from "../Settings";
import { setAppMode } from "../../redux/feautures/appStateSlice";
import {APP_MODE} from "../../type_declarations/types";

const Header: React.FC = () => {
  const appMode = useAppSelector((state) => state.appState.appMode);
  const username = useAppSelector((state) => state.session.username);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const navigate = useNavigate();

  const profilePath = username ? `/profile/${username}` : "/login"; // Redirect to login if no username
  const handleModeChange = (mode: APP_MODE) => {
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
                  className={`nav-button ${(appMode === APP_MODE.R2K && location.pathname === "/") ? "active" : ""}`}
                  onClick={() => handleModeChange(APP_MODE.R2K)}
                >
                  R2K
                </a>
                <a
                  className={`nav-button ${(appMode === APP_MODE.K2R && location.pathname === "/") ? "active" : ""}`}
                  onClick={() => handleModeChange(APP_MODE.K2R)}
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
              <Link to={profilePath} className={`nav-button`}  id="profile-button">
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
