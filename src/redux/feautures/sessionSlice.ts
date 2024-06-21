import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import ApiService from "../../api/apiService";
import { User } from "../../type_declarations/types";

// Define the initial state for user session
interface State {
  username: string | null;
  session: string | null;
  status: 'idle' | 'loading' | 'succeeded' | 'failed';
  error: string | null;
}

// Async thunk to fetch user profile based on nickname
export const fetchUserProfile = createAsyncThunk(
  'session/fetchUserProfile',
  async (username: string, { rejectWithValue }) => {
    try {
      const userProfile = await ApiService.fetchUser(username);
      return userProfile;
    } catch (error) {
      console.error(error);
      return rejectWithValue('Failed to fetch user profile');
    }
  }
);

const initialState: State = {
  username: null,
  session: null,
  status: 'idle',
  error: null,
};

export const SessionSlice = createSlice({
  name: "session",
  initialState,
  reducers: {
    setUsername(state, action: PayloadAction<string>) {
      state.username = action.payload;
    },
    setSession(state, action: PayloadAction<string>) {
      state.session = action.payload;
    },
    clearSession(state) {
      state.username = null;
      state.session = null;
      state.status = 'idle';
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUserProfile.pending, (state) => {
        state.status = 'loading';
      })
      .addCase(fetchUserProfile.fulfilled, (state, action: PayloadAction<User>) => {
        state.status = 'succeeded';
        state.username = action.payload.username;
        // Add any additional data to state if needed
      })
      .addCase(fetchUserProfile.rejected, (state, action: PayloadAction<any>) => {
        state.status = 'failed';
        state.error = action.payload;
      });
  },
});

export default SessionSlice.reducer;
export const { setUsername, setSession, clearSession } = SessionSlice.actions;