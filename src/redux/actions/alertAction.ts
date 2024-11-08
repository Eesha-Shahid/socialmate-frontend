import { createAsyncThunk } from "@reduxjs/toolkit";
import { alertReset, removeAlert, setAlert } from "../reducers/alertReducer";
import { IAlert } from "../types/alert/reducer";
import { v4 } from "uuid";

export const updateAlert = createAsyncThunk(
  "alert/updateAlert",
  async (alertData: Omit<IAlert, 'id' | 'shown'>, thunkAPI) => {
    const { dispatch } = thunkAPI;
    const id = v4();
    dispatch(setAlert({ ...alertData, id }));
    setTimeout(() => {
      dispatch(removeAlert({ message: alertData.message }));
    }, alertData.duration? alertData.duration: 4.5);
    return id;
  },
);
  
export const deleteAlert = createAsyncThunk(
  'alert/removeAlert',
  async (message: string, { dispatch }) => {
    dispatch(removeAlert({ message }));
  }
);

export const clearAlerts = createAsyncThunk('alert/alertReset', async (_, { dispatch }) => {
  try {
    dispatch(alertReset());
    return true;
  } catch (err) {
    return false;
  }
});

export const authThunks = {
  updateAlert,
  deleteAlert,
  clearAlerts,
};