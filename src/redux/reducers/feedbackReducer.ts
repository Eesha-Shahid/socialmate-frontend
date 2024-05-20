import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { FeedbackState } from "../types/feedbac/state";

const initialState: FeedbackState = {
    feedbackSending: false,
};

const feedbackSlice = createSlice({
  name: "feedback",
  initialState,
  reducers: {
    setFeedbackSending: (state, { payload }: PayloadAction<boolean>) => {
        state.feedbackSending = payload;
    },
    FeedbackReset: () => {
      return initialState;
    },
  },
});

export const {
    setFeedbackSending,
    FeedbackReset
} = feedbackSlice.actions;

export default feedbackSlice.reducer;

export const FeedbackSelector = (state: {
    feedback: FeedbackState;
}): FeedbackState => {
  return state.feedback;
};
