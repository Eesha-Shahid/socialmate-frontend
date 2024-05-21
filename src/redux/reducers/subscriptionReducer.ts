import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { SubscriptionState } from "../types/subscription/state";
import { IPaymentMethod, ISubscriptionHistory } from "../types/subscription/reducer";

const initialState: SubscriptionState = {
  paymentMethods: null,
  paymentMethodsLoading: false,
  subscriptionHistory: null,
  subscriptionHistoryLoading: false,
  addPaymentMethodLoading: false,
  addSubscriptionLoading: false,
  cancelSubscriptionLoading: false
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
    setDefaultPaymentMethod: (state, { payload }: PayloadAction<IPaymentMethod>) => {
      if (state.paymentMethods) {
        state.paymentMethods.forEach((card, ) => {
          if (card._id === payload._id) {
            card.default = true;
          } else {
            card.default = false;
          }
        });
      }
    },
    addPaymentMethodSuccess: (state, { payload }: PayloadAction<IPaymentMethod>) => {
      if (!state.paymentMethods) {
        state.paymentMethods = [];
      }
      state.paymentMethods.push(payload);
    },
    setAddPaymentMethodLoading: (state, { payload }: PayloadAction<any>) => {
      state.addPaymentMethodLoading = payload;
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
    addSubscriptionSuccess: (state, { payload }: PayloadAction<ISubscriptionHistory>) => {
      if (!state.subscriptionHistory) {
        state.subscriptionHistory = [];
      }
      state.subscriptionHistory.unshift(payload);
    },    
    cancelSubscriptionSuccess: (state, { payload }: PayloadAction<ISubscriptionHistory>) => {
      if (state.subscriptionHistory) {
        state.subscriptionHistory = state.subscriptionHistory.map(subscription =>
          subscription._id === payload._id ? { ...subscription, status: 'Inactive' } : subscription
        ) as ISubscriptionHistory[];
      }
    },
    setAddSubscriptionLoading: (state, { payload }: PayloadAction<any>) => {
      state.addSubscriptionLoading = payload;
    },
    setCancelSubscriptionLoading: (state, { payload }: PayloadAction<any>) => {
      state.cancelSubscriptionLoading = payload;
    },
    SubscriptionReset: () => {
      return initialState;
    },
  },
});

export const { 
  getPaymentMethodsSuccess, 
  getPaymentMethodsFailure,
  addPaymentMethodSuccess,
  getSubscriptionHistorySuccess,
  getSubscriptionHistoryFailure,
  addSubscriptionSuccess,
  cancelSubscriptionSuccess,
  setAddPaymentMethodLoading,
  setAddSubscriptionLoading,
  setCancelSubscriptionLoading
} =
  subscriptionSlice.actions;

export default subscriptionSlice.reducer;

export const SubscriptionSelector = (state: {
  subscription: SubscriptionState;
}): SubscriptionState => {
  return state.subscription;
};
