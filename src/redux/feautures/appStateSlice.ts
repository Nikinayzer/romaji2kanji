import {createAsyncThunk, createSlice, PayloadAction} from "@reduxjs/toolkit";
import {APP_MODE, Word} from "../../type_declarations/types";
import {WordController} from "../../logic/WordController";

interface AppState {
  inputValue: string;
  guessWord: Word | null;
  typingMode: "hiragana" | "katakana";
  showLayout: boolean;
  appMode: APP_MODE
  wrong: boolean;
  correct: boolean;
}
// Async thunk to fetch and set a random word
export const fetchAndSetRandomWord = createAsyncThunk(
    'appState/fetchAndSetRandomWord',
    async ({ includeHiragana, includeKatakana }: { includeHiragana: boolean; includeKatakana: boolean }) => {
      try {
        const word = await WordController.getWord(includeHiragana, includeKatakana);
        return word; // Ensure Word object is serializable
      } catch (error) {
        console.error('Failed to fetch and set random word:', error);
        throw error; // Throwing error is fine; it will be caught in the rejected handler
      }
    }
);
const initialState: AppState = {
  inputValue: "",
  guessWord: null,
  typingMode: "hiragana",
  showLayout: true,
  appMode: APP_MODE.R2K,
  wrong: false,
  correct: false,
};



export const AppStateSlice = createSlice({
  name: "appState",
  initialState,
  reducers: {
    setInputValue(state, action: PayloadAction<string>) {
      state.inputValue = action.payload;
    },
    setGuessWord(state, action: PayloadAction<Word>) {
      state.guessWord = action.payload;
    },
    setTypingMode(state, action: PayloadAction<"hiragana" | "katakana">) {
      state.typingMode = action.payload;
    },
    setShowLayout(state, action: PayloadAction<boolean>) {
      state.showLayout = action.payload;
    },
    setAppMode(state, action: PayloadAction<APP_MODE>) {
      state.appMode = action.payload;
    },
    setWrong(state, action: PayloadAction<boolean>) {
      state.wrong = action.payload;
    },
    setCorrect(state, action: PayloadAction<boolean>) {
      state.correct = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchAndSetRandomWord.fulfilled, (state, action) => {
        state.guessWord = action.payload;
      })
      .addCase(fetchAndSetRandomWord.rejected, (state, action) => {
        console.error(action.error.message);
      });
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