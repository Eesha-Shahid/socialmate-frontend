import { UserRoles } from "@/types";
import { IUser } from "./reducer";
export interface AuthState {
  user?: IUser | null;
  role?: UserRoles | null;
  token?: string | null;
  isAuthenticated?: boolean;
  loading?: boolean;
  googleLoginLoading?: boolean;
  googleSignupLoading?: boolean;
  // invalidToken?: boolean | null;
};

