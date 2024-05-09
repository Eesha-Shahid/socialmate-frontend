import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchedulerHubState } from "../types/schedulerHub/state";
import { IGeneratedCaptionResponseData } from "../types/schedulerHub/reducer";

const initialState: SchedulerHubState = {
    generatedCaption: null,
    generatedCaptionLoading: false
};

const schedulerHubSlice = createSlice({
  name: "schedulerHub",
  initialState,
  reducers: {
    generateCaptionSuccess: (
        state,
        { payload }: PayloadAction<IGeneratedCaptionResponseData>
    ) => {
    state.generatedCaptionLoading = true;
    state.generatedCaption = payload;
    state.generatedCaptionLoading = false;
    },
    generateCaptionFailure: (state) => {
      state.generatedCaptionLoading = false;
    },
    SchedulerHubReset: () => {
      return initialState;
    },
  },
});

export const {
    generateCaptionSuccess,
    generateCaptionFailure
} = schedulerHubSlice.actions;

export default schedulerHubSlice.reducer;

export const SchedulerHubSelector = (state: {
    schedulerHub: SchedulerHubState;
}): SchedulerHubState => {
  return state.schedulerHub;
};
