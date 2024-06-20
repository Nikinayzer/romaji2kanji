import React, { useState, useEffect } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { useLocation } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";
import "../styles/AdminPanel.css";

const AdminPanel: React.FC = () => {
  const appMode = useAppSelector((state) => state.appState.appMode);
  const dispatch = useAppDispatch();
  const location = useLocation();
  const ava = require("../resources/ava.jpg");
  enum tab {
    USERS,
    WORDS,
    WORDS_SUGGESTIONS,
    REPORTS,
  }

  const [activeTab, setActiveTab] = useState(tab.USERS);
  const [content, setContent] = useState<any>(null);

  useEffect(() => {
    const fetchData = async () => {
      let response;
      switch (activeTab) {
        case tab.USERS:
          // Fetch users data
          response = await fetch("/api/users");
          break;
        case tab.WORDS:
          // Fetch words data
          response = await fetch("/api/words");
          break;
        case tab.REPORTS:
          // Fetch reports data
          response = await fetch("/api/reports");
          break;
        default:
          response = null;
          break;
      }
      const data = await response?.json();
      setContent(data);
    };

    fetchData();
  }, [activeTab]);

  return (
    <div className="admin-panel-wrapper">
      <div className="admin-panel">
        <div className="admin-panel-menu">
          <ul>
            <li
              className={activeTab === tab.USERS ? "active" : ""}
              onClick={() => setActiveTab(tab.USERS)}
            >
              Users
            </li>
            <li
              className={activeTab === tab.WORDS ? "active" : ""}
              onClick={() => setActiveTab(tab.WORDS)}
            >
              Words
            </li>
            <li
              className={activeTab === tab.WORDS_SUGGESTIONS ? "active" : ""}
              onClick={() => setActiveTab(tab.WORDS_SUGGESTIONS)}
            >
              Words Suggestions
            </li>
            <li
              className={activeTab === tab.REPORTS ? "active" : ""}
              onClick={() => setActiveTab(tab.REPORTS)}
            >
              Reports
            </li>
          </ul>
        </div>
        <div className="admin-panel-content">
          <div className="admin=panel-search-bar">
            <input type="text" placeholder="Search..."></input>
          </div>
          <ul>
            {content ? (
              content.map((item: any, index: number) => (
                <li key={index}>{item.name}</li> // Adjust based on data structure
              ))
            ) : (
              <li>Loading...</li>
            )}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
