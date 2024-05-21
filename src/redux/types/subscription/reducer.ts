import { SubscriptionStatus } from "@/types";

export interface IPaymentMethod {
    _id: string;
    holder_name: string;
    card_number: string;
    exp_month: string;
    exp_year: string;
    cvc: string;
    default: boolean;
}

export interface ISubscriptionHistory extends Pick<IPaymentMethod, 'holder_name' | 'card_number'> {
    _id: string;
    amount: number;
    status: SubscriptionStatus;
    expiration_date: Date;
}

export interface SetDefaultPaymentMethodDto {
    cardId: string;
}

export interface AddPaymentMethodDto extends Omit<IPaymentMethod, '_id' | 'default'>{}