import { UserRoles } from "@/types";

// interface ILogin {
//   emaiL: string;
//   password: string;
// }

// interface ISignup {
//   username: string;
//   emaiL: string;
//   password: string;
// }

// type UserProfileData = {
//   _id: string;
//   name: string;
//   email: string;
//   password: string;
//   userType: string;
// };

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
export interface IResetPasswordFormData extends Pick<ISignupFormData, 'password'> {}

export interface IloginResponseData {
  token: string;
  user: IUser;
}