import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SchedulerHubState } from "../types/schedulerHub/state";
import { ISubreddit } from "../types/schedulerHub/reducer";

const initialState: SchedulerHubState = {
    generatedCaption: null,
    generatedCaptionLoading: false,
    subreddits: null,
    subredditsLoading: false,
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
    getSubredditSuccess: ( state, { payload }: PayloadAction<ISubreddit[]>) => {
      state.subredditsLoading = true;
      state.subreddits = payload;
      state.subredditsLoading = false;
    },
    getSubredditFailure: (state) => {
      state.subredditsLoading = false;
    },
    SchedulerHubReset: () => {
      return initialState;
    },
  },
});

export const {
    generateCaptionSuccess,
    generateCaptionFailure,
    setGeneratedCaptionLoading,
    getSubredditSuccess,
    getSubredditFailure,
    SchedulerHubReset
} = schedulerHubSlice.actions;

export default schedulerHubSlice.reducer;

export const SchedulerHubSelector = (state: {
    schedulerHub: SchedulerHubState;
}): SchedulerHubState => {
  return state.schedulerHub;
};
