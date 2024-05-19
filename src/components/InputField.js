import "../styles/App.css";
import "../styles/InputField.css";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import {
  setInputValue,
  setGuessWord,
  setShake,
  setCorrect,
} from "../redux/actions";
import Util from "../scripts/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function InputField() {
  const inputValue = useSelector((state) => state.inputValue);
  const guessWord = useSelector((state) => state.guessWord);
  const appMode = useSelector((state) => state.appMode);  
  const includeHiragana = useSelector((state) => state.userSettings.includeHiragana);
  const includeKatakana = useSelector((state) => state.userSettings.includeKatakana);
  const dispatch = useDispatch();
  const inputValueRef = useRef("");

  useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);

  const handleChange = (e) => {
    const typedValue = e.target.value;
    dispatch(setInputValue(typedValue));
  };

  const handleSubmit = () => {
    const inputWord = inputValueRef.current; // Use ref instead of state
    if (Util.checkAnswer(inputWord, guessWord, appMode)) {
      dispatch(setCorrect(true));
      setTimeout(() => {
        dispatch(setCorrect(false));
        dispatch(setGuessWord(Util.getRandomWord(includeHiragana, includeKatakana)));
        dispatch(setInputValue(""));
      }, 1000);
    } else {
      console.log("Incorrect guess!");
      dispatch(setShake(true));
      setTimeout(() => dispatch(setShake(false)), 500); // Remove shake state after animation
    }
  };

  return (
    <div className="input-field">
      <div className="input-container">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            handleSubmit();
          }}
        >
          {appMode === "t" ? (
            <input
              type="text"
              className="typing"
              value={inputValue}
              onChange={handleChange}
              placeholder="Type here..."
            />
          ) : (
            <input
              type="text"
              value={inputValue}
              onChange={handleChange}
              placeholder="Type here..."
            />
          )}
          {appMode !== "t" && (
            <button type="submit" className="submit-button">
              <FontAwesomeIcon icon={faCircleCheck} />
            </button>
          )}
        </form>
      </div>
    </div>
  );
}

export default InputField;
