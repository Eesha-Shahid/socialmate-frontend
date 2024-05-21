import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IAd } from "../types/adCampaign/reducer";
import { AdCampaignState } from "../types/adCampaign/state";

const initialState: AdCampaignState = {
    ads: null,
    adsLoading: false,
};

const adCampaignSlice = createSlice({
  name: "adCampaign",
  initialState,
  reducers: {
    getAdsSuccess: ( state, { payload }: PayloadAction<IAd[]>) => {
        state.adsLoading = true;
        state.ads = payload;
        state.adsLoading = false;
    },
    getAdsFailure: (state) => {
      state.adsLoading = false;
    },
    adCampaignReset: () => {
      return initialState;
    },
  },
});

export const {
    getAdsSuccess,
    getAdsFailure,
    adCampaignReset
} = adCampaignSlice.actions;

export default adCampaignSlice.reducer;

export const AdCampaignSelector = (state: {
    adCampaign: AdCampaignState;
}): AdCampaignState => {
  return state.adCampaign;
};
