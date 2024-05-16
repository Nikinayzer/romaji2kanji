// store.js
import { createStore } from "redux";
import words from "../data/words.json"; //words library
/*
const getRandomWord = (words, appMode) => {
    if (appMode === 'r2k') {
        // Filter words to exclude those where jp.iskata is true
        const filteredWords = words.filter(word => !word.jp.iskata);
        // Select a random word from the filtered list
        return filteredWords[Math.floor(Math.random() * filteredWords.length)];
    } else {
        // Select a random word from the entire list
        return words[Math.floor(Math.random() * words.length)];
    }
};
*/
const getRandomWord = (words, appMode) => {
  return words[Math.floor(Math.random() * words.length)];
};
// Initial state
const initialState = {
  inputValue: "",
  guessWord: getRandomWord(words, "r2k"), // Use the default appMode here
  typingMode: "hiragana",
  showLayout: true,
  appMode: "r2k", // r2k: romaji to kana, k2r: kana to romaji, t: typing
  shake: false,
  correct: false,
};

// Reducer
const rootReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_INPUT_VALUE":
      return {
        ...state,
        inputValue: action.payload,
      };
    case "SET_GUESS_WORD":
      return {
        ...state,
        guessWord: action.payload,
      };
    case "SET_TYPING_MODE":
      return {
        ...state,
        typingMode: action.payload,
      };
    case "SET_APP_MODE":
      return {
        ...state,
        appMode: action.payload,
      };
    case "SET_SHOW_LAYOUT":
      return {
        ...state,
        showLayout: action.payload,
      };
    case "SET_SHAKE":
      return {
        ...state,
        shake: action.payload,
      };
    case "SET_CORRECT":
      return {
        ...state,
        correct: action.payload,
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
