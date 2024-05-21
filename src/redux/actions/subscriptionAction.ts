import { createAsyncThunk } from "@reduxjs/toolkit";
import axiosInstance from "@/utils/axiosInstace";
import { addPaymentMethodSuccess, addSubscriptionSuccess, cancelSubscriptionSuccess, getPaymentMethodsSuccess, getSubscriptionHistorySuccess, setAddPaymentMethodLoading, setAddSubscriptionLoading, setCancelSubscriptionLoading } from "../reducers/subscriptionReducer";
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
      dispatch(setAddPaymentMethodLoading(true));
      const response = await axiosInstance.post(`/user/add-card`, addPaymentMethodDto);
      dispatch(addPaymentMethodSuccess(response.data.card));
      dispatch(setAddPaymentMethodLoading(false));
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

export const addSubscription = createAsyncThunk(
  "subscription/addSubscription",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      dispatch(setAddSubscriptionLoading(true));
      const response = await axiosInstance.post(`/user/subscribe`);
      console.log(response.data);
      dispatch(addSubscriptionSuccess(response.data));
      dispatch(setAddSubscriptionLoading(false));
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

export const cancelSubscription = createAsyncThunk(
  "subscription/cancelSubscription",
  async (_, thunkAPI) => {
    try {
      const { dispatch } = thunkAPI;
      dispatch(setCancelSubscriptionLoading(true));
      const response = await axiosInstance.post(`/user/unsubscribe`);
      console.log(response.data);
      dispatch(cancelSubscriptionSuccess(response.data.subscription));
      dispatch(setCancelSubscriptionLoading(false));
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
