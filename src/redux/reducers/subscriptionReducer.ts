import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubscriptionState } from "../types/subscription/state";
import { IPaymentMethod, ISubscriptionHistory } from "../types/subscription/reducer";

const initialState: SubscriptionState = {
  paymentMethods: null,
  paymentMethodsLoading: false,
  subscriptionHistory: null,
  subscriptionHistoryLoading: false,
};

const subscriptionSlice = createSlice({
  name: "subscription",
  initialState,
  reducers: {
    getPaymentMethodsSuccess: (
      state,
      { payload }: PayloadAction<IPaymentMethod[]>
    ) => {
      state.paymentMethods = payload;
      state.paymentMethodsLoading = false;
    },
    getPaymentMethodsFailure: (state) => {
      state.paymentMethodsLoading = false;
    },
    getSubscriptionHistorySuccess: (
      state,
      { payload }: PayloadAction<ISubscriptionHistory[]>
    ) => {
      state.subscriptionHistory = payload;
      state.subscriptionHistoryLoading = false;
    },
    getSubscriptionHistoryFailure: (state) => {
      state.subscriptionHistoryLoading = false;
    },
    SubscriptionReset: () => {
      return initialState;
    },
  },
});

export const { 
  getPaymentMethodsSuccess, 
  getPaymentMethodsFailure,
  getSubscriptionHistorySuccess,
  getSubscriptionHistoryFailure
} =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;

export const SubscriptionSelector = (state: {
  subscription: SubscriptionState;
}): SubscriptionState => {
  return state.subscription;
};
