import "../styles/App.css";
import "../styles/InputField.css";
import React, { useRef, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setInputValue, setGuessWord } from "../redux/actions";
import * as wanakana from "wanakana";
import Util from "../scripts/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

function InputField() {
  const inputValue = useSelector((state) => state.inputValue);
  const guessWord = useSelector((state) => state.guessWord);
  const appMode = useSelector((state) => state.appMode);
  const dispatch = useDispatch();
  const inputRef = useRef(null);
  const inputValueRef = useRef("");

  useEffect(() => {
    inputValueRef.current = inputValue;
    console.log("InputValue ref updated:", inputValueRef.current);
  }, [inputValue]);

  useEffect(() => {
    console.log("InputValue updated:", inputValue);
    console.log("GuessWord updated:", guessWord);
  }, [inputValue, guessWord]);

  const handleChange = (e) => {
    const typedValue = e.target.value;
    dispatch(setInputValue(typedValue));
  };

  const handleSubmit = () => {
    const inputWord = inputValueRef.current; // Use ref instead of state
    console.log("InputValue:", inputWord);
    console.log("GuessWord:", wanakana.toRomaji(guessWord.jp.wd));
    if (
      (inputWord === guessWord.jp.wd && appMode === "r2k") ||
      (inputWord === wanakana.toRomaji(guessWord.jp.wd) && appMode === "k2r")
    ) {
      // romaji to kanji logic
      console.log("Correct guess!");
      console.log(inputWord);
      dispatch(setGuessWord(Util.randomNewWord()));
      dispatch(setInputValue(""));
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