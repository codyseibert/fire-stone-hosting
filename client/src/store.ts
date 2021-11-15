import { configureStore } from "@reduxjs/toolkit";
// import logsReducer from "./features/logs/logsSlice";
import authenticationReducer from "./features/authentication/authenticationSlice";
import serversReducer from "./features/servers/serversSlice";

export const store = configureStore({
  reducer: {
    // logsReducer,
    authenticationReducer,
    serversReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
