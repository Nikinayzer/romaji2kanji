import "../../styles/App.css";
import "../../styles/AppLogo.css";
import React, { useState, MouseEvent } from "react";
import { ReactComponent as Logo } from "../../resources/logos/logo.svg";

interface MousePosition {
  x: number;
  y: number;
}

const AppLogo: React.FC = () => {
  const [showDialog, setShowDialog] = useState<boolean>(false);
  const [prevMousePosition, setPrevMousePosition] = useState<MousePosition | null>(null);
  const [directionChanges, setDirectionChanges] = useState<number>(0);
  const [phrase, setPhrase] = useState<string>("Hello, student!");
  const [dialogTriggered, setDialogTriggered] = useState<boolean>(false);

  const phrases: string[] = [
    "Welcome to Romaji2kanji!",
    "Learn Japanese with me!",
    "日本語を話しましょう！",
    "ゴゴゴゴ",
    "これはゴールデン体験ですね",
    "Imagine understanding anime",
    "Omae wa mou shindeiru.",
    "がんばって！",
  ];
  const easterEggPhrase: string = "やめてください！";

  function choosePhrase(easter: boolean): void {
    const randomIndex = Math.floor(Math.random() * phrases.length);
    easter ? setPhrase(easterEggPhrase) : setPhrase(phrases[randomIndex]);
  }

  const handleMouseClick = (): void => {
    if (dialogTriggered) return;
    handleDialog(false);
  };

  const handleFastMovement = (): void => {
    if (directionChanges > 1000) {
      setDirectionChanges(0);
      handleDialog(true);
    }
  };

  const handleDialog = (easter: boolean): void => {
    choosePhrase(easter);
    setShowDialog(true);
    setDialogTriggered(true);
    setTimeout(() => {
      setShowDialog(false);
      setDialogTriggered(false);
    }, 2000);
  };

  const handleMouseEnter = (e: MouseEvent<HTMLDivElement>): void => {
    setPrevMousePosition({ x: e.clientX, y: e.clientY });
  };

  const handleMouseMove = (e: MouseEvent<HTMLDivElement>): void => {
    if (!prevMousePosition) return;
    const currentMousePosition = { x: e.clientX, y: e.clientY };
    const deltaX = currentMousePosition.x - prevMousePosition.x;
    const deltaY = currentMousePosition.y - prevMousePosition.y;
    const direction = Math.sign(deltaX) !== Math.sign(deltaY) ? 1 : 0; // Check if directions of x and y change
    setDirectionChanges((prevChanges) => prevChanges + direction);
    setPrevMousePosition(currentMousePosition);
  };

  const handleMouseLeave = (): void => {
    setPrevMousePosition(null);
    setDirectionChanges(0);
  };

  return (
    <div className="logo-container" data-text="Romaji2kaji">
      <div
        className="logo-wrapper"
        data-testid="logo-wrapper"
        onClick={handleMouseClick}
        onMouseEnter={handleMouseEnter}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        onMouseOver={handleFastMovement}
      >
        <Logo className="app-logo" />
        {showDialog && (
          <div className={`dialog-bubble ${showDialog ? "show" : ""}`} data-testid="dialog-bubble">
            <p>{phrase}</p>
          </div>
        )}
      </div>
    </div>
  );
}

export default AppLogo;
