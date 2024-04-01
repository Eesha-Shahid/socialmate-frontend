import { SubscriptionStatus } from "@/types";

export interface IPaymentMethod {
    holder_name: string;
    card_number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    default: boolean;
}

export interface ISubscriptionHistory extends Pick<IPaymentMethod, 'holder_name' | 'card_number'> {
    amount: number;
    status: SubscriptionStatus;
    expiration_date: Date;
}