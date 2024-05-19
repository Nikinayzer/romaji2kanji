// actions.js
export const setInputValue = (value) => ({
  type: "SET_INPUT_VALUE",
  payload: value,
});
export const setGuessWord = (value) => ({
  type: "SET_GUESS_WORD",
  payload: value,
});
export const setTypingMode = (value) => ({
  type: "SET_TYPING_MODE",
  payload: value,
});
export const setAppMode = (value) => ({
  type: "SET_APP_MODE",
  payload: value,
});
export const setShowLayout = (value) => ({
  type: "SET_SHOW_LAYOUT",
  payload: value,
});
export const setShake = (value) => ({
  type: "SET_SHAKE",
  payload: value,
});
export const setCorrect = (value) => ({
  type: "SET_CORRECT",
  payload: value,
});
export const setDarkMode = (value) => ({
  type: "SET_DARK_MODE",
  payload: value,
});
export const setIncludeHiragana = (value) => ({
  type: "SET_INCLUDE_HIRAGANA",
  payload: value,
});
export const setIncludeKatakana = (value) => ({
  type: "SET_INCLUDE_KATAKANA",
  payload: value,
});
