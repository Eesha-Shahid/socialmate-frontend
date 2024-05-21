import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";
import { getAdsFailure, getAdsSuccess } from "../reducers/adCampaignReducer";

export const getAds = createAsyncThunk(
  "adCampaign/getAds",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axiosInstance.get(`/user/ads`);
      dispatch(getAdsSuccess(response.data));
    } catch (err: any) {
        dispatch(getAdsFailure());
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);