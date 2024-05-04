import { UserRoles } from "@/types";
export interface IUser {
  _id: string;
  stripe_customer_id?: string;
  username: string;
  email: string;
  profile_pic?: string;
  two_factor: boolean;
  access_token?: Object;
  user_type: UserRoles;
}

export interface ISignupFormData {
  username: string;
  email: string;
  password: string;
}

export interface ILoginFormData extends Omit<ISignupFormData, 'username'> {}
export interface IForgotPassowrdFormData extends Pick<ISignupFormData, 'email'> {}
export interface IResetPasswordFormData extends Pick<ISignupFormData, 'password'> {
  resetToken: string;
}

export interface IloginResponseData {
  token: string;
  user: IUser;
}