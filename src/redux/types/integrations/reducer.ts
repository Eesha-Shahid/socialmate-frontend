import { Platform } from "@/types";

export interface IIntegration {
  platform: Platform;
  username: string;
  name: string;
  profile_picture_url: string;
  login_time: Date;
}