import { configureStore } from "@reduxjs/toolkit";
import thunkMiddleware from 'redux-thunk'
import { AppStateSlice } from "./feautures/appStateSlice";
import { SettingsSlice } from "./feautures/settingsSlice";
import { SessionSlice } from "./feautures/sessionSlice";

// Create the Redux store using configureStore
const store = configureStore({
  reducer: {
    settings: SettingsSlice.reducer,
    appState: AppStateSlice.reducer,
    session: SessionSlice.reducer
  },
});

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
export default store;