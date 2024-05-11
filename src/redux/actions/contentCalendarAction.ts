import { createAsyncThunk } from "@reduxjs/toolkit";
import { addScheduledPosts, getScheduledPostsSuccess, updateScheduledPosts } from "../reducers/contentCalendarReducer";
import axiosInstance, { multipartConfig } from "@/utils/axiosInstace";
import { CreateScheduledPostDto, IUpdateScheduledPostData } from "../types/contentCalendar/reducer";
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

export const createScheduledPost = createAsyncThunk(
  "schedulerHub/createScheduledPost",
  async (createScheduledPostDto: CreateScheduledPostDto, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const formData = new FormData();
      formData.append('file', createScheduledPostDto.file); 
      const { file, ...postData } = createScheduledPostDto;
      formData.append('addScheduledPostDto', JSON.stringify(postData));
      const response = await axiosInstance.post(`/user/add-scheduled-post`, formData);
      console.log(response.data.post);
      dispatch(addScheduledPosts(response.data.post))
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
    } catch (err: any) {
      dispatch(updateAlert({ type: NotificationType.Error, message: err.response.data.message }))
      if (err.response?.status === 400) { 
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  }
);

export const createPost = createAsyncThunk(
  "schedulerHub/createPost",
  async (createScheduledPostDto: CreateScheduledPostDto, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const formData = new FormData();
      formData.append('file', createScheduledPostDto.file); 
      const { file, ...postData } = createScheduledPostDto;
      formData.append('addScheduledPostDto', JSON.stringify(postData));
      const response = await axiosInstance.post(`/user/create-post`, formData);
      console.log(response.data.post);
      // dispatch(addScheduledPosts(response.data.post))
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
    } catch (err: any) {
      dispatch(updateAlert({ type: NotificationType.Error, message: err.response.data.message }))
      if (err.response?.status === 400) { 
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
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