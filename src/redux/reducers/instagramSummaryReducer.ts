import { createSlice, PayloadAction } from "@reduxjs/toolkit";

const initialState: InstagramSummaryState = {
  analyticsSummary: null,
  analyticsSummaryLoading: false,
  upcomingPosts: null,
  upcomingPostsLoading: false,
  accountDetailsSummary: null,
  accountDetailsSummaryLoading: false,
  profileViewsSummary: null,
  profileViewsSummaryLoading: false,
  audienceInsightsSummary: null,
  audienceInsightsSummaryLoading: false,
  campaignSummary: null,
  campaignSummaryLoading: false,
  milestonesSummary: null,
  milestonesSummaryLoading: false,
  goalsSummary: null,
  goalsSummaryLoading: false,
};

const instagramSummarySlice = createSlice({
  name: "instagramSummary",
  initialState,
  reducers: {
    getAnalyticsSummarySuccess: (
      state,
      { payload }: PayloadAction<IAnalyticsSummary>
    ) => {
      state.analyticsSummaryLoading = true;
      state.analyticsSummary = payload;
      state.analyticsSummaryLoading = false;
    },
    getAnalyticsSummaryFailure: (state) => {
      state.analyticsSummaryLoading = false;
    },
    setAnalyticsSummaryLoading: (state, { payload }: PayloadAction<any>) => {
      state.analyticsSummaryLoading = payload;
    },
    getScheduledPostSummarySuccess: (
      state,
      { payload }: PayloadAction<IUpcomingPostsSummary>
    ) => {
      state.upcomingPostsLoading = true;
      state.upcomingPosts = payload;
      state.upcomingPostsLoading = false;
    },
    getScheduledPostSummaryFailure: (state) => {
      state.upcomingPostsLoading = false;
    },
    setScheduledPostsLoading: (state, { payload }: PayloadAction<any>) => {
      state.upcomingPostsLoading = payload;
    },
    getAccountDetailsSummarySuccess: (
      state,
      { payload }: PayloadAction<IAccountDetailsSummary>
    ) => {
      state.accountDetailsSummaryLoading = true;
      state.accountDetailsSummary = payload;
      state.accountDetailsSummaryLoading = false;
    },
    getAccountDetailsSummaryFailure: (state) => {
      state.accountDetailsSummaryLoading = false;
    },
    setAccountDetailsSummaryLoading: (state, { payload }: PayloadAction<any>) => {
      state.accountDetailsSummary = payload;
    },
    getProfileViewsSummarySuccess: (
      state,
      { payload }: PayloadAction<IProfileViewsSummary>
    ) => {
      state.profileViewsSummaryLoading = true;
      state.profileViewsSummary = payload;
      state.profileViewsSummaryLoading = false;
    },
    getProfileViewsSummarySFailure: (state) => {
      state.profileViewsSummaryLoading = false;
    },
    setProfileViewsSummaryLoading: (state, { payload }: PayloadAction<any>) => {
      state.profileViewsSummaryLoading = payload;
    },
    getAudienceInsightsSummarySuccess: (
      state,
      { payload }: PayloadAction<IAudienceInsightsSummary>
    ) => {
      state.audienceInsightsSummaryLoading = true;
      state.audienceInsightsSummary = payload;
      state.audienceInsightsSummaryLoading = false;
    },
    getAudienceInsightsSummarySFailure: (state) => {
      state.audienceInsightsSummaryLoading = false;
    },
    setAudienceInsightsSummaryLoading: (state, { payload }: PayloadAction<any>) => {
      state.audienceInsightsSummaryLoading = payload;
    },
    getCampaignSummarySuccess: (
      state,
      { payload }: PayloadAction<ICampaignSummary>
    ) => {
      state.campaignSummaryLoading = true;
      state.campaignSummary = payload;
      state.campaignSummaryLoading = false;
    },
    getCampaignSummarySFailure: (state) => {
      state.campaignSummaryLoading = false;
    },
    setCampaignSummaryLoading: (state, { payload }: PayloadAction<any>) => {
      state.campaignSummaryLoading = payload;
    },
    getMilestonesSummarySuccess: (
      state,
      { payload }: PayloadAction<IMilestonesSummary>
    ) => {
      state.milestonesSummaryLoading = true;
      state.milestonesSummary = payload;
      state.milestonesSummaryLoading = false;
    },
    getMilestonesySummaryFailure: (state) => {
      state.milestonesSummaryLoading = false;
    },
    setMilestonesySummaryLoading: (state, { payload }: PayloadAction<any>) => {
      state.milestonesSummaryLoading = payload;
    },
    getGoalsSummarySuccess: (
      state,
      { payload }: PayloadAction<IGoalsSummary>
    ) => {
      state.goalsSummaryLoading = true;
      state.goalsSummary = payload;
      state.goalsSummaryLoading = false;
    },
    getGoalsSummaryFailure: (state) => {
      state.goalsSummaryLoading = false;
    },
    setGoalsSummaryLoading: (state, { payload }: PayloadAction<any>) => {
      state.goalsSummaryLoading = payload;
    },
    SummaryReset: () => {
      return initialState;
    },
  },
});

export const {
  getAnalyticsSummarySuccess,
  getAnalyticsSummaryFailure,
  setAnalyticsSummaryLoading,
  getScheduledPostSummarySuccess,
  getScheduledPostSummaryFailure,
  setScheduledPostsLoading,
  getAccountDetailsSummarySuccess,
  getAccountDetailsSummaryFailure,
  setAccountDetailsSummaryLoading,
  getProfileViewsSummarySuccess,
  getProfileViewsSummarySFailure,
  setProfileViewsSummaryLoading,
  getAudienceInsightsSummarySuccess,
  getAudienceInsightsSummarySFailure,
  setAudienceInsightsSummaryLoading,
  getCampaignSummarySuccess,
  getCampaignSummarySFailure,
  setCampaignSummaryLoading,
  getMilestonesSummarySuccess,
  getMilestonesySummaryFailure,
  setMilestonesySummaryLoading,
  getGoalsSummarySuccess,
  getGoalsSummaryFailure,
  setGoalsSummaryLoading
} = instagramSummarySlice.actions;

export default instagramSummarySlice.reducer;

export const InstagramSummarySelector = (state: {
  instagramSummary: InstagramSummaryState;
}): InstagramSummaryState => {
  return state.instagramSummary;
};
