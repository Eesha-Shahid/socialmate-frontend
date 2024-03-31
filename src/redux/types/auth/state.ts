interface AuthState {
  basicUserInfo: UserProfileData | null;
  token: string | null;
  authState: boolean;
  loading: boolean;
  registerError: string | null,
  loginError: string | null,
  logoutError: string | null
};