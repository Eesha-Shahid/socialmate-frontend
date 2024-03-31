import { Action, Reducer, ThunkAction, configureStore } from "@reduxjs/toolkit";
import { appReducer, rootReducer } from "./reducers";
import { useDispatch } from "react-redux";

export type RootState = ReturnType<typeof appReducer>;
export type AppThunk = ThunkAction<void, RootState, unknown, Action<string>>;

const store = configureStore({
  reducer: rootReducer as Reducer, //persistedReducer,
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false
    }),
  devTools: true
});

export type AppDispatch = typeof store.dispatch;
export const useAppDispatch = () => {
  return useDispatch<AppDispatch>();
};

export default store;