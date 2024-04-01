import { UserRoles } from "@/types";
import { IUser } from "./reducer";
export interface AuthState {
  user?: IUser | null;
  role?: UserRoles | null;
  token?: string | null;
  isAuthenticated?: boolean;
  loading?: boolean;
  // invalidToken?: boolean | null;
};

