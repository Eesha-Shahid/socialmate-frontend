import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { ContentCalendarState } from "../types/contentCalendar/state";
import { IScheduledPost } from "../types/contentCalendar/reducer";

const initialState: ContentCalendarState = {
    scheduledPosts: null,
    scheduledPostsLoading: false
};

const contentCalendarSlice = createSlice({
  name: "contentCalendar",
  initialState,
  reducers: {
    getScheduledPostsSuccess: (
        state,
        { payload }: PayloadAction<IScheduledPost[]>
    ) => {
    state.scheduledPosts = payload;
    state.scheduledPostsLoading = false;
    },
    getScheduledPostsFailure: (state) => {
      state.scheduledPostsLoading = false;
    },
    ContentCalendarReset: () => {
      return initialState;
    },
  },
});

export const {
    getScheduledPostsSuccess,
    getScheduledPostsFailure
} = contentCalendarSlice.actions;

export default contentCalendarSlice.reducer;

export const ContentCalendarSelector = (state: {
    contentCalendar: ContentCalendarState;
}): ContentCalendarState => {
  return state.contentCalendar;
};
