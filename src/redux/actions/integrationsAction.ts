import axiosInstance from "@/utils/axiosInstace";
import { createAsyncThunk } from "@reduxjs/toolkit";
import { getIntegrationsFailure, getIntegrationsSuccess } from "../reducers/integrationsReducer";

export const getIntegrations = createAsyncThunk(
  "integrations/getIntegrations",
  async (_, thunkAPI) => {
    const { dispatch } = thunkAPI;
    try {
      const response = await axiosInstance.get(`/user/integrations`);
      dispatch(getIntegrationsSuccess(response.data));
    } catch (err: any) {
      dispatch(getIntegrationsFailure())
      if (err.response?.status === 400) { 
        return thunkAPI.rejectWithValue(err?.response.data.message[0]);
      }
      else{
        return thunkAPI.rejectWithValue(err.response.data)
      }
    }
  }
);