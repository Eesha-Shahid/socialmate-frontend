import axiosInstance from "@/utils/axiosInstace";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountDetailsSummarySuccess, getAnalyticsSummarySuccess, getAudienceInsightsSummarySuccess, getProfileViewsSummarySuccess } from "../reducers/instagramSummaryReducer";

axiosInstance.interceptors.request.use(
  (config) => {
    // const token = localStorage.getItem("token");
    const token = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY2MDg4MDU4Yzg4MjRmMjhlZWU1Mjg3NSIsImlhdCI6MTcxMTgzMzE4MCwiZXhwIjoxNzEyMDkyMzgwfQ.ZsFO6rfr53yHWc4v80E4q6iox5qDlt6Jt09GWSq5vmM'
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export const getAnalyticsSummary = createAsyncThunk(
  "instagramSummary/getAnalyticsSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.get(`/user/analytics-summary/instagram`);
      dispatch(getAnalyticsSummarySuccess(response.data));
    } catch (err: any) {
      if (err.response?.status === 400) { 
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  }
);

export const getProfileViewsSummary = createAsyncThunk(
  "instagramSummary/getProfileViewsSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.get(`/user/profile-views/instagram`);
      dispatch(getProfileViewsSummarySuccess(response.data));
    } catch (err: any) {
      if (err.response?.status === 400) { 
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  }
);

export const getAccountDetailsSummary = createAsyncThunk(
  "instagramSummary/getAccountDetailsSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.get(`/user/account-details/instagram`);
      dispatch(getAccountDetailsSummarySuccess(response.data));
    } catch (err: any) {
      if (err.response?.status === 400) { 
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  }
);

export const getAudienceInsightsSummary = createAsyncThunk(
  "instagramSummary/etAudienceInsightsSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.get(`/user/audientce-insights/instagram`);
      dispatch(getAudienceInsightsSummarySuccess(response.data));
    } catch (err: any) {
      if (err.response?.status === 400) { 
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  }
);