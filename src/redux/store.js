// store.js
import { createStore } from "redux";
import Util from "../scripts/util";

const getStoredValue = (key, defaultValue) => {
  const storedValue = localStorage.getItem(key);
  console.log(key);
  console.log(storedValue !== null ? JSON.parse(storedValue) : defaultValue);
  return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
};

const initialState = {
  inputValue: "",
  guessWord: Util.getRandomWord(true, true),
  typingMode: "hiragana",
  showLayout: true,
  appMode: "r2k", // r2k: romaji to kana, k2r: kana to romaji, t: typing
  shake: false,
  correct: false,
  userSettings: {
    isDarkMode: getStoredValue("darkMode", false),
    includeHiragana: getStoredValue("includeHiragana", true),
    includeKatakana: getStoredValue("includeKatakana", true),
  },
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
    case "SET_DARK_MODE":
      return {
        ...state,
        userSettings: { ...state.userSettings, isDarkMode: action.payload },
      };
    case "SET_INCLUDE_HIRAGANA":
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          includeHiragana: action.payload,
        },
      };
    case "SET_INCLUDE_KATAKANA":
      return {
        ...state,
        userSettings: {
          ...state.userSettings,
          includeKatakana: action.payload,
        },
      };
    default:
      return state;
  }
};

const store = createStore(rootReducer);

export default store;
