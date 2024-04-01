import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";
import { ILoginFormData, ISignupFormData, IUser, IloginResponseData } from "../types/auth/reducer";
import { authReset, loginSuccess, userLoaded } from "../reducers/authReducer";
import { setAuthToken } from "@/utils/authToken";
import store from "../store";

export const login = createAsyncThunk(
  "auth/login",
  async (formData: ILoginFormData, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.post("/auth/login", formData);
      const responseData = response.data as IloginResponseData;
      localStorage.setItem('token', responseData.token)
      dispatch(loginSuccess());
      dispatch(loadUser());
      return response.data;
    } catch (err: any) {
      if (err.response?.status === 401) { 
        return thunkAPI.rejectWithValue(err?.response.data.message);
      }
      else{
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
      const response = await axiosInstance.post("/auth/signup", formData);
      const responseData = response.data as IloginResponseData;
      localStorage.setItem('token', responseData.token)
      dispatch(loginSuccess());
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
          user: { ...res.data.user } as IUser,
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
};