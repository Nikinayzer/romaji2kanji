import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../../type_declarations/types";
import { WordController } from "../../logic/WordController";

interface AppState {
  inputValue: string;
  guessWord: Word;
  typingMode: "hiragana" | "katakana";
  showLayout: boolean;
  appMode: "r2k" | "k2r" | "t";
  wrong: boolean;
  correct: boolean;
}

const initialState: AppState = {
  inputValue: "",
  guessWord: WordController.getRandomWord(true, true),
  typingMode: "hiragana",
  showLayout: true,
  appMode: "r2k",
  wrong: false,
  correct: false,
};

export const AppStateSlice = createSlice({
  name: "AppState",
  initialState,
  reducers: {
    setInputValue(state, action) {
      state.inputValue = action.payload;
    },
    setGuessWord(state, action: PayloadAction<Word>) {
      state.guessWord = action.payload;
    },
    setTypingMode(state, action) {
      state.typingMode = action.payload;
    },
    setShowLayout(state, action) {
      state.showLayout = action.payload;
    },
    setAppMode(state, action) {
      state.appMode = action.payload;
    },
    setWrong(state, action) {
      state.wrong = action.payload;
    },
    setCorrect(state, action) {
      state.correct = action.payload;
    },
  },
});

export default AppStateSlice.reducer;
export const {
  setInputValue,
  setGuessWord,
  setTypingMode,
  setShowLayout,
  setAppMode,
  setWrong,
  setCorrect,
} = AppStateSlice.actions;
