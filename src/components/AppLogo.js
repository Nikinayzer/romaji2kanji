import "../styles/App.css";
import "../styles/AppLogo.css";
import React, { useState } from "react";
import { ReactComponent as Logo } from "../resources/logos/logo.svg";

function AppLogo() {
  const [showDialog, setShowDialog] = useState(false);
  const [prevMousePosition, setPrevMousePosition] = useState(null);
  const [directionChanges, setDirectionChanges] = useState(0);
  const [phrase, setPhrase] = useState("Hello, student!");
  const [dialogTriggered, setDialogTriggered] = useState(false);

  const phrases = [
    "Welcome to Romaji2kanji!",
    "Learn Japanese with me!",
    "日本語を話しましょう！",
    "ゴゴゴゴ",
    "これはゴールデン体験ですね",
    "Imagine understanding anime",
    "Omae wa mou shindeiru.",
    "がんばって！",
  ];
  const easterEggPhrase = "やめてください！";

  function choosePhrase(easter) {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    easter ? setPhrase(easterEggPhrase) : setPhrase(phrases[randomIndex]);
  }

  const handleMouseClick = () => {
    if (dialogTriggered) return;
    handleDialog(false);
  };

  const handleFastMovement = () => {
    if (directionChanges > 3000) {
      setDirectionChanges(0);
      handleDialog(true);
    }
  };
  const handleDialog = (easter) => {
    choosePhrase(easter);
    setShowDialog(true);
    setDialogTriggered(true);
    setTimeout(() => {
      setShowDialog(false);
      setDialogTriggered(false);
    }, 2000);
  };

  const handleMouseEnter = (e) => {
    setPrevMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e) => {
    if (!prevMousePosition) return;
    const currentMousePosition = { x: e.clientX, y: e.clientY };
    const deltaX = currentMousePosition.x - prevMousePosition.x;
    const deltaY = currentMousePosition.y - prevMousePosition.y;
    const direction = Math.sign(deltaX) !== Math.sign(deltaY) ? 1 : 0; // Check if directions of x and y change
    setDirectionChanges((prevChanges) => prevChanges + direction);
    setPrevMousePosition(currentMousePosition);
  };

  const handleMouseLeave = () => {
    setPrevMousePosition(null);
    setDirectionChanges(0);
  };

  return (
    <div className="logo-container" data-text="Romaji2kaji">
      <div
        className="logo-wrapper"
        onClick={handleMouseClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleFastMovement}
      >
        <Logo className="app-logo" />
        {showDialog && (
          <div className={`dialog-bubble ${showDialog ? "show" : ""}`}>
            <p>{phrase}</p>
          </div>
        )}
      </div>
      <h1 className="app-logo-text">Romaji2kanji</h1>
    </div>
  );
}

export default AppLogo;
