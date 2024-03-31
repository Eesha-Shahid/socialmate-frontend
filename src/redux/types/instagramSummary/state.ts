interface InstagramSummaryState {
    analyticsSummary: IAnalyticsSummary | null;
    analyticsSummaryLoading: boolean;
    upcomingPosts: IUpcomingPostsSummary | null;
    upcomingPostsLoading: boolean;
    accountDetailsSummary: IAccountDetailsSummary | null;
    accountDetailsSummaryLoading: boolean;
    profileViewsSummary: IProfileViewsSummary | null;
    profileViewsSummaryLoading: boolean;
    audienceInsightsSummary: IAudienceInsightsSummary | null;
    audienceInsightsSummaryLoading: boolean;
    campaignSummary: ICampaignSummary | null;
    campaignSummaryLoading: boolean;
    milestonesSummary: IMilestonesSummary | null;
    milestonesSummaryLoading: boolean;
    goalsSummary: IGoalsSummary | null;
    goalsSummaryLoading: boolean;
}