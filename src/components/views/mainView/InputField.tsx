import "../../../styles/App.css";
import "../../../styles/InputField.css";
import React, { useRef, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../../redux/hooks";
import {
  setInputValue,
  setCorrect,
  setGuessWord,
  setWrong,
  APPMODE,
} from "../../../redux/feautures/appStateSlice";
import Util from "../../../util/util";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import AnswerController from "../../../logic/AnswerController";
import { WordController } from "../../../logic/WordController";
import ApiService from "../../../api/apiService";

const InputField: React.FC = () => {
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

  const handleChange = (e: any) => {
    const typedValue = e.target.value;
    dispatch(setInputValue(typedValue));
  };
  interface guess{
    id: number;
    successful: boolean;
  }
  const handleSubmit = async () => {
    const inputWord = inputValueRef.current;

    if (!guessWord) {
      return;
    }

    const isSuccessful = AnswerController.checkAnswer(inputWord, guessWord, appMode);

    // Update UI based on successful or unsuccessful guess
    if (isSuccessful) {
      dispatch(setCorrect(true));
      setTimeout(async () => {
        dispatch(setCorrect(false));
        try {
          const newGuessWord = await WordController.getWord(includeHiragana, includeKatakana);
          dispatch(setGuessWord(newGuessWord));
          dispatch(setInputValue(""));
        } catch (error) {
          console.error('Error fetching new word:', error);
          // Handle error as needed
        }
      }, 1000);
    } else {
      //console.log("Incorrect guess!");
      dispatch(setWrong(true));
      setTimeout(() => dispatch(setWrong(false)), 500);
    }

    // Prepare guess object
    const guessData: guess = {
      id: guessWord.id,
      successful: isSuccessful,
    };

    // Submit guess to ApiService
    try {
      const response = await ApiService.submitGuess(guessData);
      //console.log("Guess submitted successfully:", response);
      // Handle success as needed
    } catch (error) {
      console.error("Failed to submit guess:", error);
      // Handle error state or display an error message to the user
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
          <input
            type="text"
            value={inputValue}
            onChange={handleChange}
            placeholder="Type here..."
          />
          <button type="submit" className="submit-button">
            <FontAwesomeIcon icon={faCircleCheck} />
          </button>
        </form>
      </div>
    </div>
  );
};

export default InputField;
