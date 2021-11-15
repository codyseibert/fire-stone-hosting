import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import { LoginForm } from "../../actions/login.action";
import loginProxy from "../../http/login.http";
import history from "../../history";
import { NavigateFunction } from "react-router-dom";

export interface AuthenticationState {
  token: string | null;
  user: any;
  error: string | null;
}

const token = window.localStorage.getItem("token");
const user = window.localStorage.getItem("user");

const initialState: AuthenticationState = {
  token: token ? JSON.parse(token) : null,
  user: user ? JSON.parse(user) : null,
  error: null,
};

type LoginArgs = {
  form: LoginForm;
  navigate: NavigateFunction;
};

export const login = createAsyncThunk<any, LoginArgs>(
  "authentication/login",
  async ({ form, navigate }) => {
    const { user, token } = await loginProxy(form);
    window.localStorage.setItem("token", JSON.stringify(token));
    window.localStorage.setItem("user", JSON.stringify(user));
    navigate("/dashboard");
    return {
      user,
      token,
    };
  }
);

export const logsSlice = createSlice({
  name: "authentication",
  initialState,
  reducers: {
    logout: (state, action: PayloadAction<NavigateFunction>) => {
      state.user = null;
      state.token = null;
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("user");
      action.payload("/");
    },
  },
  extraReducers: (builder) => {
    builder.addCase(login.fulfilled, (state, action) => {
      state.token = action.payload?.token;
      state.user = action.payload?.user;
    });
    builder.addCase(login.rejected, (state, action) => {
      state.error = action.payload as string;
    });
  },
});

export const { logout } = logsSlice.actions;

export default logsSlice.reducer;
