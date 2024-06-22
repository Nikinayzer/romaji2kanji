import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import * as japanese from "japanese";
import React, { useState, useEffect } from "react";
import Tokenizer from "../../../logic/Tokenizer";
import { WordController } from "../../../logic/WordController";
import {
  APPMODE,
  setGuessWord,
  setInputValue,
  fetchAndSetRandomWord 
} from "../../../redux/feautures/appStateSlice";
import { useAppDispatch, useAppSelector} from "../../../redux/hooks";
import { RootState } from "../../../redux/store";
import "../../../styles/App.css";
import "../../../styles/WordField.css";

const WordField: React.FC = () => {
  const dispatch = useAppDispatch();
  
  useEffect(() => {
    // Fetch and set initial random word
    dispatch(fetchAndSetRandomWord({ includeHiragana: true, includeKatakana: true }));
  }, [dispatch]);
  
  const guessWord = useAppSelector(
    (state: RootState) => state.appState.guessWord
  );
  const appMode = useAppSelector((state: RootState) => state.appState.appMode);
  const shake = useAppSelector((state: RootState) => state.appState.wrong);
  const correct = useAppSelector((state: RootState) => state.appState.correct);
  const includeHiragana = useAppSelector(
    (state: RootState) => state.settings.includeHiragana
  );
  const includeKatakana = useAppSelector(
    (state: RootState) => state.settings.includeKatakana
  );

  const splitWord: string[] = guessWord
    ? Tokenizer.tokenize(guessWord.kana)
    : [];

  const [hoveredChar, setHoveredChar] = useState<string | null>(null);

  const handleHover = (char: string) => {
    setHoveredChar(char);
  };

  const handleMouseLeave = () => {
    setHoveredChar(null);
  };

  const renderWord = () => {
    if (!guessWord) {
      return (
        <div className="loading-dots">
          <span style={{ "--i": 1 } as React.CSSProperties}>.</span>
          <span style={{ "--i": 2 } as React.CSSProperties}>.</span>
          <span style={{ "--i": 3 } as React.CSSProperties}>.</span>
        </div>
      );
    }

    return splitWord.map((char: string, index: number) => {
      const uniqueKey = `${char}-${index}`;
      const isActive = hoveredChar === uniqueKey;

      return (
        <span
          className={`word-part ${isActive ? "active" : ""}`}
          key={index}
          onMouseEnter={() => handleHover(uniqueKey)}
          onMouseLeave={handleMouseLeave}
          ref={(el) => {
            if (el && isActive) {
              const rect = el.getBoundingClientRect();
              const middleX = rect.left + rect.width / 2;
              const tooltip = el.querySelector(".tooltip") as HTMLElement; // Type assertion
              if (tooltip) tooltip.style.left = `${middleX}px`;
            }
          }}
        >
          {appMode === APPMODE.R2K ? japanese.romanize(char) : char}
          <span className={`tooltip ${isActive ? "active" : ""}`}>
            {isActive
              ? appMode === APPMODE.R2K
                ? char
                : japanese.romanize(char)
              : ""}
          </span>
        </span>
      );
    });
  };

  const handleNewWordClick = async () => {
    try {
      const newWord = await WordController.getWord(includeHiragana, includeKatakana);
      dispatch(setGuessWord(newWord));
      dispatch(setInputValue(""));
    } catch (error) {
      console.error("Error fetching new word:", error);
      // Handle error appropriately, such as showing a message to the user
    }
  };

  return (
    <div className="word-field">
      <div className="word-container">
        <div
          className={`word ${shake ? "shake" : ""} ${correct ? "correct" : ""}`}
        >
          {renderWord()}
        </div>
        {guessWord && (
          <button
            id="new-word-button"
            onClick={handleNewWordClick}
          >
            <FontAwesomeIcon
              className="new-word-icon"
              icon={faArrowsRotate}
              size="2xl"
            />
          </button>
        )}
      </div>
      {guessWord && (
        <div className="word-info">
          <div className="word-info-item">
            <div className="word-info-title">
              <img
                width="25"
                height="25"
                src="https://img.icons8.com/color/48/great-britain-circular.png" //change later
                alt="great-britain-circular"
              />
            </div>

            <span className="word-info-value">{guessWord.english}</span>
          </div>
        </div>
      )}
    </div>
  );
};

export default WordField;
