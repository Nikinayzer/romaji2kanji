import "../styles/App.css";
import "../styles/InputField.css";
import React, { useRef, useEffect } from "react";
import {useAppDispatch, useAppSelector} from "../redux/hooks";
import { setInputValue, setCorrect, setGuessWord, setWrong } from "../redux/feautures/appStateSlice";
import Util from "../scripts/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";

const InputField: React.FC =() =>{
  const inputValue = useAppSelector((state) => state.appState.inputValue);
  const guessWord = useAppSelector((state) => state.appState.guessWord);
  const appMode = useAppSelector((state) => state.appState.appMode);
  const includeHiragana = useAppSelector(
    (state) => state.settings.includeHiragana
  );
  const includeKatakana = useAppSelector(
    (state) => state.settings.includeKatakana
  );
  const dispatch = useAppDispatch();
  const inputValueRef = useRef("");

  useEffect(() => {
    inputValueRef.current = inputValue;
  }, [inputValue]);

  const handleChange = (e:any) => {
    const typedValue = e.target.value;
    dispatch(setInputValue(typedValue));
  };

  const handleSubmit = () => {
    const inputWord = inputValueRef.current; // Use ref instead of state
    if (Util.checkAnswer(inputWord, guessWord, appMode)) {
      dispatch(setCorrect(true));
      setTimeout(() => {
        dispatch(setCorrect(false));
        dispatch(
          setGuessWord(Util.getRandomWord(includeHiragana, includeKatakana))
        );
        dispatch(setInputValue(""));
      }, 1000);
    } else {
      console.log("Incorrect guess!");
      dispatch(setWrong(true));
      setTimeout(() => dispatch(setWrong(false)), 500); // Remove shake state after animation
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
