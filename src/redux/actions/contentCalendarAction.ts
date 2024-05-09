import { createAsyncThunk } from "@reduxjs/toolkit";
import { getScheduledPostsSuccess, updateScheduledPosts } from "../reducers/contentCalendarReducer";
import axiosInstance from "@/utils/axiosInstace";
import { IUpdateScheduledPostData } from "../types/contentCalendar/reducer";
import { updateAlert } from "./alertAction";
import { NotificationType } from "@/types";

export const getScheduledPosts = createAsyncThunk(
  "contentCalendar/getScheduledPosts",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.get(`/user/scheduled-posts`);
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

export const updateScheduledPost = createAsyncThunk(
  "contentCalendar/updatedScheduledPost",
  async (postData: IUpdateScheduledPostData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const response = await axiosInstance.post("/user/update-scheduled-post", postData);
    dispatch(updateScheduledPosts(response.data))
    dispatch(updateAlert({ type: response.data.post ? NotificationType.Success : NotificationType.Error, message: response.data.message }))
  }
);