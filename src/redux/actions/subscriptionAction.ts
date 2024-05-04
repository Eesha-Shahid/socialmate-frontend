import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";
import { getPaymentMethodsSuccess, getSubscriptionHistorySuccess } from "../reducers/subscriptionReducer";

export const getPaymentMethods = createAsyncThunk(
  "subscription/getPaymentMethods",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.get(`/user/payment-methods`);
      dispatch(getPaymentMethodsSuccess(response.data.data));
    } catch (err: any) {
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);

export const getSubscriptionHistry = createAsyncThunk(
    "subscription/getSubscriptionHistry",
    async (_, thunkAPI) => {
      try {
        const { dispatch } = thunkAPI;
        const response = await axiosInstance.get(`/user/subscription-history`);
        dispatch(getSubscriptionHistorySuccess(response.data.data));
      } catch (err: any) {
        if (err.response?.status === 400) {
          return thunkAPI.rejectWithValue(err?.response.data.message[0]);
        } else {
          return thunkAPI.rejectWithValue(err.response.data);
        }
      }
    }
  );
