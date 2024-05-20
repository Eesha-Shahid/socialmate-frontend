import { combineReducers } from "redux";
import authReducer, { AuthSelector } from "./authReducer";
import instagramSummaryReducer, { InstagramSummarySelector } from "./instagramSummaryReducer";
import contentCalendarReducer, { ContentCalendarSelector } from "./contentCalendarReducer";
import subscriptionReducer, { SubscriptionSelector } from "./subscriptionReducer";
import schedulerHubReducer, { SchedulerHubSelector } from "./schedulerHubReducer";
import alertReducer, { AlertSelector } from "./alertReducer";
import integrationsReducer, { IntegrationsSelector } from "./integrationsReducer";
import influencerCampaignReducer, { InfluencerCampaignSelector } from "./influencerCampaignReducer";
import adCampaignReducer, { AdCampaignSelector } from "./adCampaignReducer";
import feedbackReducer, { FeedbackSelector } from "./feedbackReducer";

export const appReducer = combineReducers({
  auth: authReducer,
  instagramSummary: instagramSummaryReducer,
  contentCalendar: contentCalendarReducer,
  subscription: subscriptionReducer,
  schedulerHub: schedulerHubReducer,
  alert: alertReducer,
  integrations: integrationsReducer,
  influencerCampaign: influencerCampaignReducer,
  adCampaign: adCampaignReducer,
  feedback: feedbackReducer,
});

export {
    AuthSelector,
    InstagramSummarySelector,
    ContentCalendarSelector,
    SubscriptionSelector,
    SchedulerHubSelector,
    AlertSelector,
    IntegrationsSelector,
    InfluencerCampaignSelector,
    AdCampaignSelector,
    FeedbackSelector,
}

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState, action: any) => {
  if (action.type === 'RESET') {
    return appReducer({} as RootState, action);
  }
  return appReducer(state, action);
};

export default appReducer;