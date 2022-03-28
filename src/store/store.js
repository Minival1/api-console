import { configureStore  } from '@reduxjs/toolkit';
import authReducer from "../slices/authSlice"
import historyReducer from "../slices/historySlice"

export const store = configureStore({
  reducer: {
    auth: authReducer,
    history: historyReducer
  },
});
