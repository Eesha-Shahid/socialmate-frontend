import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";
import { getPaymentMethodsSuccess, getSubscriptionHistorySuccess } from "../reducers/subscriptionReducer";
import { AddPaymentMethodDto, SetDefaultPaymentMethodDto } from "../types/subscription/reducer";
import { updateAlert } from "./alertAction";
import { NotificationType } from "@/types";

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

export const setDefaultPaymentMethod = createAsyncThunk(
  "subscription/setDefaultPaymentMethod",
  async (setDefaultPaymentMethodDto: SetDefaultPaymentMethodDto, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.post(`/user/set-default-card`, setDefaultPaymentMethodDto);
      dispatch(setDefaultPaymentMethod(response.data.card));
    } catch (err: any) {
      if (err.response?.status === 400) {
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      } else {
        return thunkAPI.rejectWithValue(err.response.data);
      }
    }
  }
);

export const addPaymentMethod = createAsyncThunk(
  "subscription/addPaymentMethod",
  async (addPaymentMethodDto: AddPaymentMethodDto, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      const response = await axiosInstance.post(`/user/add-card`, addPaymentMethodDto);
      dispatch(addPaymentMethod(response.data.card));
      dispatch(updateAlert({ type: NotificationType.Success, message: response.data.message }))
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
