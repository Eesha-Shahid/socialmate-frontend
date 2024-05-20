import { Ad } from "./reducer";

export interface AdCampaignState {
    ads: Ad[] | null;
    adsLoading: boolean
}