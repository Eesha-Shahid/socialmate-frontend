import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";
import { getInfluencerListFailure, getInfluencerListSuccess, getInfluencersFailure, getInfluencersSuccess } from "../reducers/influencerCampaignReducer";
import { UpdateInfluencerDto } from "../types/influencerCampaign/reducer";
import { updateAlert } from "./alertAction";
import { NotificationType } from "@/types";

export const getInfluencers = createAsyncThunk(
  "influencerCampaign/getInfluencers",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axiosInstance.get(`/user/influencers`);
      dispatch(getInfluencersSuccess(response.data));

    } catch (err: any) {
        dispatch(getInfluencersFailure());
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);

export const getInfluencerList = createAsyncThunk(
  "influencerCampaign/getInfluencerList",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axiosInstance.get(`/user/influencer-list`);
      dispatch(getInfluencerListSuccess(response.data));

    } catch (err: any) {
        dispatch(getInfluencerListFailure());
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);

export const addInfluencerToList = createAsyncThunk(
  "influencerCampaign/addInfluencerToList",
  async (updateInfluencerDto: UpdateInfluencerDto, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axiosInstance.post(`/user/influencer-list/add`, updateInfluencerDto);
      dispatch(addInfluencerToList(response.data))
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
    } catch (err: any) {
      dispatch(updateAlert({ type: NotificationType.Error, message: err.data.message }))
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);

export const removeInfluencerFromList = createAsyncThunk(
  "influencerCampaign/removeInfluencerFromList",
  async (updateInfluencerDto: UpdateInfluencerDto, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axiosInstance.post(`/user/influencer-list/remove`, updateInfluencerDto);
      dispatch(removeInfluencerFromList(response.data))
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
    } catch (err: any) {
      dispatch(updateAlert({ type: NotificationType.Error, message: err.data.message }))
      return thunkAPI.rejectWithValue(err.response?.data);
    }
  }
);