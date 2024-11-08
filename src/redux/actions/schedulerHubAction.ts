import axiosInstance from "@/utils/axiosInstace";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGeneratedCaptionFormData } from "../types/schedulerHub/reducer";
import { generateCaptionSuccess, getSubredditFailure, getSubredditSuccess, setGeneratedCaptionLoading } from "../reducers/schedulerHubReducer";
import { updateAlert } from "./alertAction";
import { NotificationType } from "@/types";

export const generateCaption = createAsyncThunk(
  "schedulerHub/generateCaption",
  async (queryString: IGeneratedCaptionFormData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      dispatch(setGeneratedCaptionLoading(true))
      const response = await axiosInstance.post(`/user/generate-caption`, queryString);
      dispatch(setGeneratedCaptionLoading(false))
      dispatch(generateCaptionSuccess(response.data.suggestions));
    } catch (err: any) {
      dispatch(updateAlert({ type: NotificationType.Error, message: err.response.data.message[0] }))
      if (err.response?.status === 400) { 
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  }
);


export const getSubreddits = createAsyncThunk(
  "schedulerHub/getSubreddits",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axiosInstance.get(`/reddit/subreddits`);
      dispatch(getSubredditSuccess(response.data));
    } catch (err: any) {
        dispatch(getSubredditFailure());
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);
