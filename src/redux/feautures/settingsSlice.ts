import { createSlice} from "@reduxjs/toolkit";

export interface Settings {
  isDarkMode: boolean;
  includeHiragana: boolean;
  includeKatakana: boolean;
}

// Define a function to get stored values from localStorage
const getStoredValue = <T>(key: string, defaultValue: T): T => {
  const storedValue = localStorage.getItem(key);
  return storedValue !== null ? JSON.parse(storedValue) : defaultValue;
};
const initialState: Settings = {
  isDarkMode: getStoredValue<boolean>("darkMode", false),
  includeHiragana: getStoredValue<boolean>("includeHiragana", true),
  includeKatakana: getStoredValue<boolean>("includeKatakana", true),
};

export const SettingsSlice = createSlice({
  name: "Settings",
  initialState,
  reducers: {
    toggleDarkMode(state) {
      state.isDarkMode = !state.isDarkMode;
    },
    toggleIncludeHiragana(state) {
      state.includeHiragana = !state.includeHiragana;
    },
    toggleIncludeKatakana(state) {
      state.includeKatakana = !state.includeKatakana;
    },
  },
});

export default SettingsSlice.reducer;
export const { toggleDarkMode, toggleIncludeHiragana, toggleIncludeKatakana } =
  SettingsSlice.actions;
