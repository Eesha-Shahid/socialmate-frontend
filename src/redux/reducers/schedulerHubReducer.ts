import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchedulerHubState } from "../types/schedulerHub/state";

const initialState: SchedulerHubState = {
    generatedCaption: null,
    generatedCaptionLoading: false
};

const schedulerHubSlice = createSlice({
  name: "schedulerHub",
  initialState,
  reducers: {
    generateCaptionSuccess: ( state, { payload }: PayloadAction<any>) => {
      state.generatedCaptionLoading = true;
      state.generatedCaption = payload;
      state.generatedCaptionLoading = false;
    },
    generateCaptionFailure: (state) => {
      state.generatedCaptionLoading = false;
    },
    setGeneratedCaptionLoading: (state, { payload }: PayloadAction<any>) => {
      state.generatedCaptionLoading = payload;
    },
    SchedulerHubReset: () => {
      return initialState;
    },
  },
});

export const {
    generateCaptionSuccess,
    generateCaptionFailure,
    SchedulerHubReset,
    setGeneratedCaptionLoading
} = schedulerHubSlice.actions;

export default schedulerHubSlice.reducer;

export const SchedulerHubSelector = (state: {
    schedulerHub: SchedulerHubState;
}): SchedulerHubState => {
  return state.schedulerHub;
};
