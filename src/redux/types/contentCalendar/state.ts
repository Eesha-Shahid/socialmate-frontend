import { IScheduledPost } from "./reducer";

export interface ContentCalendarState{
    scheduledPosts: IScheduledPost[] | null;
    scheduledPostsLoading: boolean;
}