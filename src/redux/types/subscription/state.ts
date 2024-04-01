import { IPaymentMethod, ISubscriptionHistory } from "./reducer";

export interface SubscriptionState {
    paymentMethods: IPaymentMethod[] | null;
    paymentMethodsLoading: boolean;
    subscriptionHistory: ISubscriptionHistory[] | null;
    subscriptionHistoryLoading: boolean;
}