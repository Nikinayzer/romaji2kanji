import React from "react";

import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { Link, useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

import "../styles/Profile.css";

const Profile: React.FC = () => {
  const appMode = useAppSelector((state) => state.appState.appMode);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const ava = require("../resources/ava.jpg");

  return (
    <div className="profile">

                        <div className="profile-info">
                            <div className="profile-pic-wrapper">
                                <img src={ava} className="profile-pic"></img> 
                            </div>
                            <h2>n1ckor</h2>
                        </div>
                        <div className="profile-follows">
                            <div className="followers"></div>
                            <div className="following"></div>
                        </div>

                        <div className="profile-stats">
                            <h2>Statistics</h2>
                            <div className="Stats-grid">
                                <div className="Stat-label">Games played total</div>
                                <div className="Stat-value">200</div>

                                <div className="Stat-label">Percentage of wins</div>
                                <div className="Stat-value">45 %</div>

                                <div className="Stat-label">Average reaction time</div>
                                <div className="Stat-value">20ms</div>

                                <div className="Stat-label">First game played</div>
                                <div className="Stat-value">01-01-2020</div>

                                <div className="Stat-label">Last game played</div>
                                <div className="Stat-value">19-01-2023</div>
                            </div>
                        </div>
                </div>
  );
};

export default Profile;
