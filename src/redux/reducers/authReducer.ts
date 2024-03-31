import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { login, logout, register } from "../actions/authAction";

const initialState: AuthState = {
  basicUserInfo: null,
  token: null,
  authState: false,
  loading: false,
  registerError: null,
  loginError: null,
  logoutError: null
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthState: (state, action: PayloadAction<boolean>) => {
      state.authState = action.payload;
    },
    resetRegisterError: (state) => {
      state.registerError = null;
    },
    resetLoginError: (state) => {
      state.loginError = null;
    }
  },
  extraReducers: (builder) => {
    builder
      .addCase(login.pending, (state) => {
        state.loading = true;
        state.loginError = null;
      })
      .addCase(
        login.fulfilled, (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.basicUserInfo = action.payload.user;
          state.token = action.payload.token
          state.authState = true;
        }
      )
      .addCase(login.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === 'string') {
          state.loginError = action.payload; 
        } else {
          state.loginError = "Login Failed"; 
        }
      })

      .addCase(register.pending, (state) => {
        state.loading = true;
        state.registerError = null;
      })
      .addCase(
        register.fulfilled,
        (state, action: PayloadAction<any>) => {
          state.loading = false;
          state.basicUserInfo = action.payload.user;
          state.token = action.payload.token;
          state.authState = true;
        }
      )
      .addCase(register.rejected, (state, action) => {
        state.loading = false;
        if (typeof action.payload === 'string') {
          state.registerError = action.payload; 
        } else {
          state.registerError = "Registration Failed"; 
        }
      })
      .addCase(logout.pending, (state) => {
        state.loading = true;
        state.logoutError = null;
      })
      .addCase(logout.fulfilled, () => {
        return initialState;
      })
      .addCase(logout.rejected, (state, action) => {
        state.loading = false;
        state.logoutError = "Logout failed";
      })
  },
});

export const { setAuthState, resetRegisterError, resetLoginError } = authSlice.actions;

export default authSlice.reducer;

export const AuthSelector = (state: { auth: AuthState }): AuthState => {
  return state.auth;
};