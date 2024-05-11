import axiosInstance from "@/utils/axiosInstace";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGeneratedCaptionFormData } from "../types/schedulerHub/reducer";
import { generateCaptionSuccess } from "../reducers/schedulerHubReducer";
import { updateAlert } from "./alertAction";
import { NotificationType } from "@/types";
import { CreateScheduledPostDto } from "../types/contentCalendar/reducer";

export const generateCaption = createAsyncThunk(
  "schedulerHub/generateCaption",
  async (queryString: IGeneratedCaptionFormData, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axiosInstance.post(`/user/generate-caption`, queryString);
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

