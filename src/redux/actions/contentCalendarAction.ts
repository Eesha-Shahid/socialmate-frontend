import { createAsyncThunk } from "@reduxjs/toolkit";
import { getScheduledPostsSuccess } from "../reducers/contentCalendarReducer";
import axiosInstance from "@/utils/axiosInstace";

export const getScheduledPosts = createAsyncThunk(
  "instagramSummary/getAnalyticsSummary",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.get(`/user/scheduled-posts`);
      console.log(response);
      dispatch(getScheduledPostsSuccess(response.data.data));
    } catch (err: any) {
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);
