import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AlertState } from "../types/alert/state";
import { IAlert } from "../types/alert/reducer";

const initialState: AlertState = {
  alerts: null,
  alertsLoading: false
};

const alertSlice = createSlice({
  name: "alert",
  initialState,
  reducers: {
    setAlert: (state, { payload }: PayloadAction<IAlert>) => {
      if (!state.alerts) {
          state.alerts = [payload];
      } else {
          // Check if the message text already exists
          const existingIndex = state.alerts.findIndex(alert => alert.message === payload.message);
          
          // If the message text doesn't exist, add the alert
          if (existingIndex === -1) {
              state.alerts = [payload, ...state.alerts];
          } else {
              // If the message text exists, replace the existing alert with the new one
              state.alerts[existingIndex] = payload;
          }
      }
    },   
    removeAlert: (state, { payload }: PayloadAction<Pick<IAlert, "message">>) => {
      state.alerts = state.alerts?.filter((alert) => {
        return alert.message !== payload.message;
      }) as IAlert[];
    },
    alertReset: () => {
      return initialState;
    },
  }
})

export const { 
  setAlert,
  removeAlert,
  alertReset
} = alertSlice.actions;

export default alertSlice.reducer;

export const AlertSelector = (state: { alert: AlertState }): AlertState => {
  return state.alert;
};