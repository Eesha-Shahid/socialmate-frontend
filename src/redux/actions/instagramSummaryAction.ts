import axiosInstance from "@/utils/axiosInstace";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getAccountDetailsSummarySuccess, getAnalyticsSummarySuccess, getAudienceInsightsSummarySuccess, getGoalsSummarySuccess, getMilestonesSummarySuccess, getProfileViewsSummarySuccess, setAccountDetailsSummaryLoading, setAnalyticsSummaryLoading, setAudienceInsightsSummaryLoading, setGoalsSummaryLoading, setMilestonesySummaryLoading, setProfileViewsSummaryLoading } from "../reducers/instagramSummaryReducer";

export const getAnalyticsSummary = createAsyncThunk(
  "instagramSummary/getAnalyticsSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      dispatch(setAnalyticsSummaryLoading(true))
      const response = await axiosInstance.get(`/user/analytics-summary/instagram`);
      dispatch(setAnalyticsSummaryLoading(false))
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
      dispatch(setProfileViewsSummaryLoading(true))
      const response = await axiosInstance.get(`/user/profile-views/instagram`);
      dispatch(setProfileViewsSummaryLoading(false))
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
      dispatch(setAccountDetailsSummaryLoading(true))
      const response = await axiosInstance.get(`/user/account-details/instagram`);
      dispatch(setAccountDetailsSummaryLoading(false))
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
  "instagramSummary/getAudienceInsightsSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      dispatch(setAudienceInsightsSummaryLoading(true))
      const response = await axiosInstance.get(`/user/audientce-insights/instagram`);
      dispatch(setAudienceInsightsSummaryLoading(false))
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

export const getMilestonesSummary = createAsyncThunk(
  "instagramSummary/getMilestonesSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      dispatch(setMilestonesySummaryLoading(true))
      const response = await axiosInstance.get(`/user/milestones/instagram`);
      dispatch(setMilestonesySummaryLoading(false))
      dispatch(getMilestonesSummarySuccess(response.data));
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

export const getGoalsSummary = createAsyncThunk(
  "instagramSummary/getGoalsSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      dispatch(setGoalsSummaryLoading(true))
      const response = await axiosInstance.get(`/user/goals/instagram`);
      dispatch(setGoalsSummaryLoading(false))
      dispatch(getGoalsSummarySuccess(response.data));
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