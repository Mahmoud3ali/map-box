import { isUser, UserFormData } from "./../models/user";
import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { User } from "../models/user";
import { authService } from "../services";
import jwt_decode from "jwt-decode";
import http from "../services/http";

export type AuthState = {
  user?: User;
  token?: string;
  error?: string;
  status: "idle" | "loading" | "failed" | "authenticated";
};

const initialState: AuthState = (() => {
  const token = localStorage.getItem("token");
  if (token) {
    const decodedUser = jwt_decode(token);
    if (
      isUser(decodedUser) &&
      "exp" in decodedUser &&
      typeof decodedUser["exp"] === "number" &&
      decodedUser["exp"] > Date.now() / 1000
    ) {
      http.setJwt(token);
      return {
        user: decodedUser,
        token,
        status: "authenticated",
      };
    }
  }
  return { status: "idle" };
})();

export const loginAsync = createAsyncThunk(
  "auth/login",
  async (user: UserFormData): Promise<AuthState> => {
    const auth = await authService.login(user);
    const decodedUser = jwt_decode(auth.token);
    if (!isUser(decodedUser)) {
      throw new Error("Server returned invalid user");
    }
    http.setJwt(auth.token);
    localStorage.setItem("token", auth.token);
    return {
      user: decodedUser,
      token: auth.token,
      status: "authenticated",
    };
  }
);

export const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      http.setJwt();
      localStorage.removeItem("token");
      state.token = undefined;
      state.user = undefined;
      state.status = "idle";
    },
    reset: (state) => {
      if (state.status === "failed") {
        state.error = undefined;
        state.status = "idle";
      }
    },
  },
  extraReducers: (builder) => {
    builder.addCase(loginAsync.pending, (state) => {
      state.status = "loading";
    });
    builder.addCase(loginAsync.fulfilled, (_, action) => ({
      status: "authenticated",
      user: action.payload.user,
      token: action.payload.token,
    }));
    builder.addCase(loginAsync.rejected, (state, action) => {
      state.status = "failed";
      state.error = action.error.message;
    });
  },
});

export const { logout, reset } = authSlice.actions;
