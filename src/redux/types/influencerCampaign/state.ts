import { IInfluencer } from "./reducer";

export interface InfluencerCampaignState {
    influencers: IInfluencer[] | null;
    influencersLoading: boolean
    influencerList: IInfluencer[] | null;
    influencerListLoading: boolean
}