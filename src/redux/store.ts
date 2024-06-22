import { configureStore, combineReducers } from "@reduxjs/toolkit";
import { persistStore, persistReducer } from "redux-persist";
import storage from "redux-persist/lib/storage"; // defaults to localStorage for web
import { AppStateSlice } from "./feautures/appStateSlice";
import { SettingsSlice } from "./feautures/settingsSlice";
import { SessionSlice } from "./feautures/sessionSlice";

// Combine all the reducers
const rootReducer = combineReducers({
  settings: SettingsSlice.reducer,
  appState: AppStateSlice.reducer,
  session: SessionSlice.reducer,
});

// Configuration for redux-persist
const persistConfig = {
  key: "root",
  storage,
  whitelist: ["session"], // only persist session slice
};

// Create a persisted reducer
const persistedReducer = persistReducer(persistConfig, rootReducer);

// Create the Redux store using configureStore
const store = configureStore({
  reducer: persistedReducer,
});

// Create a persistor
const persistor = persistStore(store);

// Get the type of our store variable
export type AppStore = typeof store;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore['getState']>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = AppStore['dispatch'];
export { store, persistor };
