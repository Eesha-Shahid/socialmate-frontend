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
    addScheduledPosts: ( state, { payload }: PayloadAction<IScheduledPost>) => {
      console.log(state.scheduledPosts)
      console.log("Updating scheduled posts")
      if (!state.scheduledPosts) {
        state.scheduledPosts = [];
      }
      state.scheduledPosts.push(payload);
      console.log(state.scheduledPosts)
      console.log("Updated scheduled posts")
    },
    updateScheduledPosts: (state, {payload}: PayloadAction<IScheduledPost>) => {
      if (state.scheduledPosts !== null) {
        const index = state.scheduledPosts.findIndex(post => post._id === payload._id);
        if (index !== -1) {
          state.scheduledPosts[index] = payload;
        }
      }
    },
    ContentCalendarReset: () => {
      return initialState;
    },
  },
});

export const {
    getScheduledPostsSuccess,
    getScheduledPostsFailure,
    addScheduledPosts,
    updateScheduledPosts,
    ContentCalendarReset
} = contentCalendarSlice.actions;

export default contentCalendarSlice.reducer;

export const ContentCalendarSelector = (state: {
    contentCalendar: ContentCalendarState;
}): ContentCalendarState => {
  return state.contentCalendar;
};
