import "../styles/App.css";
import "../styles/Settings.css";
import React, { useState, useEffect, useRef } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGear } from "@fortawesome/free-solid-svg-icons";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import {
  toggleDarkMode,
  toggleIncludeHiragana,
  toggleIncludeKatakana,
} from "../redux/feautures/settingsSlice";
import SwitchItem from "./SwitchItem";

const Settings: React.FC = () => {
  const [showDropdown, setShowDropdown] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  const isDarkMode = useAppSelector((state) => state.settings.isDarkMode);
  const includeKatakana = useAppSelector(
    (state) => state.settings.includeKatakana
  );
  const includeHiragana = useAppSelector(
    (state) => state.settings.includeHiragana
  );
  const dispatch = useAppDispatch();

  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
  };

  const handleDarkModeToggle = () => {
    localStorage.setItem("darkMode", JSON.stringify(!isDarkMode));
    dispatch(toggleDarkMode());
  };

  const handleSwitchToggle = (type: "hiragana" | "katakana") => {
    if (type === "hiragana") {
      localStorage.setItem("includeHiragana", JSON.stringify(!includeHiragana));
      dispatch(toggleIncludeHiragana());
    } else if (type === "katakana") {
      dispatch(toggleIncludeKatakana());
      localStorage.setItem("includeKatakana", JSON.stringify(!includeKatakana));
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: any) => {
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
      <button
        className={`settings-button ${showDropdown ? "active" : ""}`}
        id="settings-button"
        onClick={() => toggleDropdown()}
      >
        <FontAwesomeIcon icon={faGear} size="2xl" />
      </button>
      {showDropdown && (
        <div className="settings-dropdown">
          <div
            className="dark-mode-switch-container dropdown-item"
            onClick={() => handleDarkModeToggle()}
          >
            <input
              className="dark-mode-switch"
              type="checkbox"
              readOnly
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
};

export default Settings;
