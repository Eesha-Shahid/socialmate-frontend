import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { AuthState } from "../types/auth/state";

const initialState: AuthState = {
  user: null,
  role: null,
  token: null,
  isAuthenticated: false,
  loading: false
  // invalidToken?: boolean | null;
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userLoaded: (state, { payload }: PayloadAction<AuthState>) => {
      const authToken = payload.token;
      delete payload.token;
      state.user = payload.user;
      state.role = payload.role;
      state.token = authToken;
      state.isAuthenticated = payload.isAuthenticated;
      state.loading = false;
    },
    registerSuccess: (state) => {
      return state;
    },
    loginSuccess: (state) => {
      state.loading = false
    },
    loginFailure: (state) => {
      state.loading = false
      return state;
    },
    setLoading: (state, { payload }: PayloadAction<{ loading: boolean }>) => {
      state.loading = payload.loading;
    },
    authReset: () => {
      return initialState;
    },
  }
  
});

export const { 
  authReset,
  userLoaded,
  registerSuccess,
  loginSuccess,
  loginFailure,
  setLoading 
} = authSlice.actions;

export default authSlice.reducer;

export const AuthSelector = (state: { auth: AuthState }): AuthState => {
  return state.auth;
};