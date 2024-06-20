import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { Word } from "../../type_declarations/types";
import { WordController } from "../../logic/WordController";

export enum APPMODE {
  R2K,
  K2R
}

interface AppState {
  inputValue: string;
  guessWord: Word | null;
  typingMode: "hiragana" | "katakana";
  showLayout: boolean;
  appMode: APPMODE
  wrong: boolean;
  correct: boolean;
}
// Async thunk to fetch and set a random word
export const fetchAndSetRandomWord = createAsyncThunk(
  'appState/fetchAndSetRandomWord',
  async ({ includeHiragana, includeKatakana }: { includeHiragana: boolean; includeKatakana: boolean }) => {
    try {
      const randomWord = await WordController.getWord(includeHiragana, includeKatakana);
      return randomWord;
    } catch (error) {
      console.error(error);
      throw Error('Failed to fetch and set random word');
    }
  }
);
const initialState: AppState = {
  inputValue: "",
  guessWord: null,
  typingMode: "hiragana",
  showLayout: true,
  appMode: APPMODE.R2K,
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
    setAppMode(state, action: PayloadAction<APPMODE>) {
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