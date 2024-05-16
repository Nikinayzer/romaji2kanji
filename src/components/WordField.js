import "../styles/App.css";
import "../styles/WordField.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setGuessWord, setAppMode } from "../redux/actions";
import * as wanakana from "wanakana";
import * as japanese from "japanese";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import Util from "../scripts/util";

function WordField() {
  const guessWord = useSelector((state) => state.guessWord);
  const appMode = useSelector((state) => state.appMode);
  const dispatch = useDispatch();

  const splitWord = Util.splitWordToCharsObject(guessWord.jp);

  const [hoveredChar, setHoveredChar] = useState(null);

  const handleHover = (char) => {
    setHoveredChar(char);
  };

  const handleMouseLeave = () => {
    setHoveredChar(null);
  };

  const renderWord = () => {
    //const charsArray = appMode === 'r2k' ? splitWord.rmj : splitWord.wd;
    const charsArray = splitWord.wd;
    return charsArray.map((char, index) => {
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
              const tooltip = el.querySelector(".tooltip");
              tooltip.style.left = `${middleX}px`;
            }
          }}
        >
          {appMode === "r2k"
            ? japanese.romanize(char, "modified hepburn")
            : char}
          <span className={`tooltip ${isActive ? "active" : ""}`}>
            {
              //isActive ? ((appMode === 'r2k') ? wanakana.toKana(char) : wanakana.toRomaji(char)) : ""
              isActive
                ? appMode === "r2k"
                  ? char
                  : japanese.romanize(char)
                : ""
            }
          </span>
        </span>
      );
    });
  };

  return (
    <div className="word-field">
      <div className="word-container">
        <div className="word">{renderWord()}</div>
        <button
          id="new-word-button"
          onClick={() => {
            dispatch(setGuessWord(Util.randomNewWord()));
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
              src="https://img.icons8.com/color/48/great-britain-circular.png"
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