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
      const NOT_FOUND = -1;
      const currentState = current(state);
      console.log(currentState)
      state.alerts = state.alerts ? [payload, ...state.alerts] : [payload];
      // const sameMessageIndex = currentState.findIndex((alert) => {
      //   return alert.message === payload.message;
      // });
      // if (sameMessageIndex === NOT_FOUND) {
      //   state.push(payload);
      // }
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