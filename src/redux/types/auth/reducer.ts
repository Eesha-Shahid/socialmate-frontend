interface ILogin {
  emaiL: string;
  password: string;
}

interface ISignup {
  username: string;
  emaiL: string;
  password: string;
}

type UserProfileData = {
  _id: string;
  name: string;
  email: string;
  password: string;
  userType: string;
};