import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";

export const login = createAsyncThunk(
  "login",
  async (data: ILogin, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/login", data);
      localStorage.setItem('token', response.data.token)
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
  "auth/signup",
  async (data: ISignup, thunkAPI) => {
    try {
      const response = await axiosInstance.post("/auth/signup", data);
      localStorage.setItem('token', response.data.token)
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

export const logout = createAsyncThunk("logout", async () => {
  localStorage.removeItem("token");
});

export const authThunks = {
  login,
  register,
  logout,
};