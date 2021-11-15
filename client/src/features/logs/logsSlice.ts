import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export interface LogsState {
  logs: string[];
}

const initialState: LogsState = {
  logs: [],
};

export const logsSlice = createSlice({
  name: "logs",
  initialState,
  reducers: {
    setLogs: (state, action: PayloadAction<string[]>) => {
      state.logs = action.payload;
    },
  },
});

export const { setLogs } = logsSlice.actions;

export default logsSlice.reducer;
