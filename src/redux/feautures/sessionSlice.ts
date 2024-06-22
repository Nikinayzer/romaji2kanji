import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ApiService from "../../api/apiService";
import { User } from "../../type_declarations/types";

// Define the initial state for user session
interface State {
  id: number | null;
  username: string | null;
  loggedIn: boolean;
}

// Async thunk to fetch user profile based on nickname
const initialState: State = {
  id: null,
  username: null,
  loggedIn: false,
};

export const SessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setSession(state, action: PayloadAction<any>) {
      state.id = action.payload.id;
      state.username = action.payload.username;
      state.loggedIn = true;
    },
    clearSession(state) {
      state.id = null;
      state.username = null;
      state.loggedIn = false;
    },
  },
});

export default SessionSlice.reducer;
export const { setSession, clearSession } = SessionSlice.actions;
