import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { InfluencerCampaignState } from "../types/influencerCampaign/state";
import { IInfluencer } from "../types/influencerCampaign/reducer";

const initialState: InfluencerCampaignState = {
    influencers: null,
    influencersLoading: false,
    influencerList: null,
    influencerListLoading: false
};

const influencerCampaignSlice = createSlice({
  name: "influencerCampaign",
  initialState,
  reducers: {
    getInfluencersSuccess: ( state, { payload }: PayloadAction<IInfluencer[]>) => {
        state.influencersLoading = true;
        state.influencers = payload;
        state.influencersLoading = false;
    },
    getInfluencersFailure: (state) => {
      state.influencersLoading = false;
    },
    getInfluencerListSuccess: ( state, { payload }: PayloadAction<IInfluencer[]>) => {
        state.influencerListLoading = true;
        state.influencerList = payload;
        state.influencerListLoading = false;
    },
    getInfluencerListFailure: (state) => {
      state.influencerListLoading = false;
    },
    addInfluencerToList: (state, { payload }: PayloadAction<IInfluencer>) => {
      if (!state.influencerList) {
        state.influencerList = [];
      }
      state.influencerList.push(payload);
      if (state.influencers) {
        state.influencers = state.influencers.filter(influencer => influencer._id !== payload._id);
      }
    },
    removeInfluencerFromList: (state, { payload }: PayloadAction<IInfluencer>) => {
      if (!state.influencers) {
        state.influencers = [];
      }
      state.influencers.push(payload);
      if (state.influencerList) {
        state.influencerList = state.influencerList.filter(influencer => influencer._id !== payload._id);
      }
    },
    influencerCampaignReset: () => {
      return initialState;
    },
  },
});

export const {
    getInfluencersSuccess,
    getInfluencersFailure,
    getInfluencerListSuccess,
    getInfluencerListFailure,
    influencerCampaignReset
} = influencerCampaignSlice.actions;

export default influencerCampaignSlice.reducer;

export const InfluencerCampaignSelector = (state: {
    influencerCampaign: InfluencerCampaignState;
}): InfluencerCampaignState => {
  return state.influencerCampaign;
};
