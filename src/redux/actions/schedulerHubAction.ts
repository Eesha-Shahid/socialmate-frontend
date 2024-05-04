import axiosInstance from "@/utils/axiosInstace";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { IGeneratedCaptionFormData } from "../types/schedulerHub/reducer";
import { generateCaptionSuccess } from "../reducers/schedulerHubReducer";

export const generateCaption = createAsyncThunk(
  "schedulerHub/generateCaption",
  async (queryString: IGeneratedCaptionFormData, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.post(`/user/generate-caption`,{queryString});
      dispatch(generateCaptionSuccess(response.data));
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