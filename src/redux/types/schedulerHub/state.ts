import { IGeneratedCaptionResponseData } from "./reducer";

export interface SchedulerHubState {
    generatedCaption: IGeneratedCaptionResponseData | null,
    generatedCaptionLoading: boolean
}