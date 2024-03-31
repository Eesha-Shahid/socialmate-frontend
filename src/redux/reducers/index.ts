import { combineReducers } from "redux";
import authReducer, { AuthSelector } from "./authReducer";
import instagramSummaryReducer, { InstagramSummarySelector } from "./instagramSummaryReducer";
// import userReducer, { UserSelector } from "./userReducer";
// import projectReducer, { ProjectSelector } from "./projectReducer";

export const appReducer = combineReducers({
  auth: authReducer,
  instagramSummary: instagramSummaryReducer
//   user: userReducer,
//   project: projectReducer,
});

export {
    InstagramSummarySelector
//   AuthSelector,
//   UserSelector,
//   ProjectSelector
}

export type RootState = ReturnType<typeof appReducer>;

export const rootReducer = (state: RootState, action: any) => {
  if (action.type === 'RESET') {
    return appReducer({} as RootState, action);
  }
  return appReducer(state, action);
};

export default appReducer;