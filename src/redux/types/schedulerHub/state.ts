import { ISubreddit } from "./reducer";

export interface SchedulerHubState {
    generatedCaption: string[] | null,
    generatedCaptionLoading: boolean,
    subreddits: ISubreddit[] | null,
    subredditsLoading: boolean
}