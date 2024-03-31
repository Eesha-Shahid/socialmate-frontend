interface ItimerPeriodStats {
    value: number | null;
    last_value: number | null;
}

interface IAnalyticsSummary {
    follows_and_unfollows: ItimerPeriodStats;
    reach: ItimerPeriodStats;
    likes: ItimerPeriodStats;
    comments: ItimerPeriodStats;
}

interface IUpcomingPostsSummary {

}

interface IAccountDetailsSummary {
    // TODO: Make it enum later
    platform: string;
    name: string;
    username: string;
    profile_picture_url: string | null;
    bio: string | null;
    website: string | null;
    media_count: number | null;
    followers_count: number | null;
    follows_count: number | null;
}

interface IProfileViewsSummary {
    day_views: number;
    week_views: number;
    month_views: number;
}

interface IAudienceInsightsSummary {
    audience_country: string[];
    audience_gender_age: {
        female: number;
        male: number;
    };
}

interface ICampaignSummary {

}

interface IMilestonesSummary {

}

interface IGoalsSummary {

}