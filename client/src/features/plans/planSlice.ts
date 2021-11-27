import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { NavigateFunction } from "react-router-dom";

export interface PlanState {
  memory: number;
  imageSrc: string;
  name: string;
}

const initialState: PlanState = {
  memory: 1024,
  imageSrc: "",
  name: "",
};

type SetPlanType = {
  navigate: NavigateFunction;
  plan: PlanState;
  token: string | null;
};

export const planSlice = createSlice({
  name: "plan",
  initialState,
  reducers: {
    setPlan: (state, action: PayloadAction<SetPlanType>) => {
      console.log(action.payload);
      state = action.payload.plan;

      if (action.payload.token) {
        action.payload.navigate("/purchase/confirm");
      } else {
        action.payload.navigate("/purchase/payment-details");
      }
    },
  },
});

export const { setPlan } = planSlice.actions;

export default planSlice.reducer;
