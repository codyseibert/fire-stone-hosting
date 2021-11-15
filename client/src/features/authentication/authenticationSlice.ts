import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { LoginForm } from "../../actions/login.action";
import loginProxy from "../../http/login.http";

export interface AuthenticationState {
  token: string | null;
  user: any;
  error: string | null;
}

const initialState: AuthenticationState = {
  token: null,
  user: null,
  error: null,
};

export const login = createAsyncThunk(
  "authentication/login",
  async (form: LoginForm) => {
    const { user, token } = await loginProxy(form as LoginForm);
    window.localStorage.setItem("token", JSON.stringify(token));
    window.localStorage.setItem("user", JSON.stringify(user));
    // history.push("/dashboard");
    return {
      user,
      token,
    };
  }
);

export const logsSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      console.log("login success", action);
      state.token = action.payload?.token;
      state.user = action.payload?.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      console.log("login error action", action);
      state.error = action.payload as string;
    });
  },
});

export const {} = logsSlice.actions;

export default logsSlice.reducer;
