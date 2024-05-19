import "../styles/App.css";
import "../styles/Settings.css";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useSelector, useDispatch } from "react-redux";
import {
  setDarkMode,
  setIncludeHiragana,
  setIncludeKatakana,
} from "../redux/actions";
import SwitchItem from "./SwitchItem";

function Settings() {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef(null);

  const isDarkMode = useSelector((state) => state.userSettings.isDarkMode);
  const includeKatakana = useSelector((state) => state.userSettings.includeKatakana);
  const includeHiragana = useSelector((state) => state.userSettings.includeHiragana);
  const dispatch = useDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDarkModeToggle = () => {
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
    dispatch(setDarkMode(!isDarkMode));
    
  };

  const handleSwitchToggle = (type) => {
    if (type === "hiragana") {      
      localStorage.setItem("includeHiragana", JSON.stringify(!includeHiragana));
      dispatch(setIncludeHiragana(!includeHiragana));

    } else if (type === "katakana") {
      dispatch(setIncludeKatakana(!includeKatakana));
      localStorage.setItem("includeKatakana", JSON.stringify(!includeKatakana));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setShowDropdown(false);
      }
    };
    document.addEventListener("click", handleClickOutside);

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };

  }, []);

  useEffect(() => {
    if (isDarkMode) {
      document.body.classList.add("dark-mode");
    } else {
      document.body.classList.remove("dark-mode");
    }
  }, [isDarkMode]);

  return (
    <div className="settings-container" ref={dropdownRef}>
      <button className={`settings-button ${showDropdown? "active": ""}`} id="settings-button" onClick={() => toggleDropdown()}>
        <FontAwesomeIcon icon={faGear} size="2xl" />
      </button>
      {showDropdown && (
        <div className="settings-dropdown">
          <div className="dark-mode-switch-container dropdown-item" onClick={handleDarkModeToggle}>
            <input
              className="dark-mode-switch"
              type="checkbox"
              onChange={handleDarkModeToggle}
              checked={isDarkMode}
            />
            <label htmlFor="toggle" className="title">
              {isDarkMode ? "Dark Mode" : "Light Mode"}
            </label>
          </div>
          <div className="switches-list">
            <SwitchItem
              label="Include hiragana"
              checked={includeHiragana}
              disabled={!includeKatakana}
              onChange={() => handleSwitchToggle("hiragana")}
            />
            <SwitchItem
              label="Include katakana"
              checked={includeKatakana}
              disabled={!includeHiragana}
              onChange={() => handleSwitchToggle("katakana")}
            />
          </div>
        </div>
      )}
    </div>
  );
}

export default Settings;
