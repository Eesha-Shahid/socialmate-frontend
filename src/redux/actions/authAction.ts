import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";
import { IForgotPassowrdFormData, ILoginFormData, IResetPasswordFormData, ISignupFormData, IUser, IloginResponseData } from "../types/auth/reducer";
import { authReset, loginFailure, loginSuccess, setGoogleLoginLoading, setGoogleSignupLoading, setLoading, userLoaded } from "../reducers/authReducer";
import { setAuthToken } from "@/utils/authToken";
import store from "../store";
import { updateAlert } from "./alertAction";
import { NotificationType } from "@/types";
import { CredentialResponse } from "@react-oauth/google";

export const login = createAsyncThunk(
  "auth/login",
  async (formData: ILoginFormData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      console.log(formData);
      dispatch(setLoading({loading: true}))
      const response = await axiosInstance.post("/auth/login", formData);
      const responseData = response.data as IloginResponseData;
      localStorage.setItem('token', responseData.token)
      dispatch(loginSuccess());
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
      dispatch(loadUser());
      return response.data;
    } catch (err: any) {
      dispatch(loginFailure());
      if (err.response?.status === 401) { 
        dispatch(updateAlert({ type: NotificationType.Error, message: err?.response.data.message }))
        return thunkAPI.rejectWithValue(err?.response.data.message);
      }
      else{
        dispatch(updateAlert({ type: NotificationType.Error, message: err.response.data }))
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  },
);

export const register = createAsyncThunk(
  "auth/register",
  async (formData: ISignupFormData, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      dispatch(setLoading({loading: true}))
      const response = await axiosInstance.post("/auth/signup", formData);
      const responseData = response.data as IloginResponseData;
      localStorage.setItem('token', responseData.token)
      dispatch(loginSuccess());
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
      dispatch(loadUser());
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 400) { 
          return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else if (err.response?.status === 409) {
          return thunkAPI.rejectWithValue("User with this email already exists.")
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  }
);

export const loadUser = createAsyncThunk(
  'auth/loadUser', 
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const authToken = localStorage.getItem('token')
      if (authToken){
        setAuthToken(authToken);
      }
      const res = await axiosInstance.get('/user/profile');
      const user = res.data;

      dispatch(
        userLoaded({
          user: { ...res.data } as IUser,
          role: user.user_type,
          token: localStorage.getItem('token'),
          isAuthenticated: true
        })
      );
      localStorage.removeItem('token')
      return true;
    } catch (err) {
      return false;
    }
});

export const forgotPassword = createAsyncThunk(
  'auth/forgotPassword', 
  async (formData: IForgotPassowrdFormData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const response = await axiosInstance.post("/auth/send-forgot-email", formData);
    dispatch(updateAlert({ type: response.data.success? NotificationType.Success : NotificationType.Error, message: response.data.message }))
  }
)

export const resetPassword = createAsyncThunk(
  'auth/resetPassword', 
  async (formData: IResetPasswordFormData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const response = await axiosInstance.patch("/auth/reset-password", formData);
    dispatch(updateAlert({ type: response.data.success? NotificationType.Success : NotificationType.Error, message: response.data.message }))
  }
)

export const googleSignup = createAsyncThunk(
  'auth/googleSignup', 
  async (credentialResponse: CredentialResponse, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(setGoogleSignupLoading(true))
      const response = await axiosInstance.post("/auth/google-signup", { token: credentialResponse.credential });
      const responseData = response.data as IloginResponseData;
      localStorage.setItem('token', responseData.token)
      dispatch(setGoogleSignupLoading(false))
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
      dispatch(loadUser());
    } catch (error: any) {
      dispatch(updateAlert({ type: NotificationType.Error, message: error?.response?.data }))
    }
  }
)

export const googleLogin = createAsyncThunk(
  'auth/googleLogin', 
  async (credentialResponse: CredentialResponse, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(setGoogleLoginLoading(true))
      const response = await axiosInstance.post("/auth/google-login", { token: credentialResponse.credential });
      const responseData = response.data as IloginResponseData;
      localStorage.setItem('token', responseData.token)
      dispatch(setGoogleLoginLoading(false))
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
      dispatch(loadUser());
    } catch (error: any) {
      dispatch(updateAlert({ type: NotificationType.Error, message: error?.response?.data }))
    }
  }
)

export const logout = createAsyncThunk(
  "auth/logout", 
  async (_, thunkAPI) => {
    localStorage.removeItem("token");
    const { dispatch } = thunkAPI;
    dispatch(authReset());
    store.dispatch({type: "RESET"})
});

export const authThunks = {
  login,
  register,
  logout,
  forgotPassword,
  resetPassword
};