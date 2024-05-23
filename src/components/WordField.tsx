import "../styles/App.css";
import "../styles/WordField.css";
import React, { useState } from "react";
import { useAppSelector, useAppDispatch } from "../redux/hooks";
import { setInputValue, setGuessWord } from "../redux/feautures/appStateSlice";
import * as japanese from "japanese";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import Util from "../logic/util";
import { RootState } from "../redux/store";
import Tokenizer from "../logic/Tokenizer";
import { WordController } from "../logic/WordController";

const WordField: React.FC = () => {
  const guessWord = useAppSelector((state: RootState) => state.appState.guessWord);
  const appMode = useAppSelector((state: RootState) => state.appState.appMode);
  const shake = useAppSelector((state: RootState) => state.appState.wrong);
  const correct = useAppSelector((state: RootState) => state.appState.correct);
  const includeHiragana = useAppSelector((state: RootState) => state.settings.includeHiragana);
  const includeKatakana = useAppSelector((state: RootState) => state.settings.includeKatakana);
  const dispatch = useAppDispatch();

  const splitWord = Tokenizer.tokenize(guessWord.jp);

  const [hoveredChar, setHoveredChar] = useState<string | null>(null);

  const handleHover = (char: string) => {
    setHoveredChar(char);
  };

  const handleMouseLeave = () => {
    setHoveredChar(null);
  };

  const renderWord = () => {
    const charsArray = splitWord.wd;
    return charsArray.map((char: string, index: number) => {
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
          {appMode === "r2k"
            ? japanese.romanize(char)
            : char}
          <span className={`tooltip ${isActive ? "active" : ""}`}>
            {isActive
              ? appMode === "r2k"
                ? char
                : japanese.romanize(char)
              : ""}
          </span>
        </span>
      );
    });
  };

  return (
    <div className="word-field">
      <div className="word-container">
        <div className={`word ${shake ? "shake" : ""} ${correct ? "correct" : ""}`}>
          {renderWord()}
        </div>
        <button
          id="new-word-button"
          onClick={() => {
            dispatch(
              setGuessWord(WordController.getRandomWord(includeHiragana, includeKatakana))
            );
            dispatch(setInputValue(""));
          }}
        >
          <FontAwesomeIcon
            className="new-word-icon"
            icon={faArrowsRotate}
            size="2xl"
          />
        </button>
      </div>
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
          <span className="word-info-value">{guessWord.mean}</span>
        </div>
      </div>
    </div>
  );
}

export default WordField;