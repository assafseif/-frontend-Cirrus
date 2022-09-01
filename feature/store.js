import { configureStore } from "@reduxjs/toolkit";
import storage from "redux-persist/lib/storage";
import { combineReducers } from "redux";
import credentialReducer from "./credentialSlice";
import { persistReducer } from "redux-persist";
import thunk from "redux-thunk";

//ADING REDUCERS

const reducers = combineReducers({
  credential: credentialReducer,
});

//SAVE THEM IN LOCALSTORAGE " WE CAN STORE THEM IN SESSIONSTORAGE AND COOKIES STORAGE "
const persistConfig = {
  key: "root",
  storage,
};

//PERSIST THEM
const persistedReducer = persistReducer(persistConfig, reducers);

// AND NOW CONFIGURESTORE AND EXPORT IT
const store = configureStore({
  reducer: persistedReducer,
  middleware: [thunk],
});

export default store;
