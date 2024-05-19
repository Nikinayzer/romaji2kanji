import "../styles/App.css";
import "../styles/WordField.css";
import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setGuessWord } from "../redux/actions";
import * as japanese from "japanese";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowsRotate } from "@fortawesome/free-solid-svg-icons";
import Util from "../scripts/util";

function WordField() {
  const guessWord = useSelector((state) => state.guessWord);
  const appMode = useSelector((state) => state.appMode);
  const shake = useSelector((state) => state.shake);
  const correct = useSelector((state) => state.correct);
  const includeHiragana = useSelector(
    (state) => state.userSettings.includeHiragana
  );
  const includeKatakana = useSelector(
    (state) => state.userSettings.includeKatakana
  );
  const dispatch = useDispatch();

  const splitWord = Util.tokenize(guessWord.jp);

  const [hoveredChar, setHoveredChar] = useState(null);

  const handleHover = (char) => {
    setHoveredChar(char);
  };

  const handleMouseLeave = () => {
    setHoveredChar(null);
  };

  const renderWord = () => {
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
            ? japanese.romanize(char, Util.makeDefaultConfig())
            : char}
          <span className={`tooltip ${isActive ? "active" : ""}`}>
            {
              //isActive ? ((appMode === 'r2k') ? wanakana.toKana(char) : wanakana.toRomaji(char)) : ""
              isActive
                ? appMode === "r2k"
                  ? char
                  : japanese.romanize(char, Util.makeDefaultConfig())
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
        <div
          className={`word ${shake ? "shake" : ""} ${correct ? "correct" : ""}`}
        >
          {renderWord()}
        </div>
        <button
          id="new-word-button"
          onClick={() => {
            dispatch(
              setGuessWord(Util.getRandomWord(includeHiragana, includeKatakana))
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
