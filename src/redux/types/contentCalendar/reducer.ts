import { MediaType } from "@/types";

export interface IScheduledPost {
    media_type: MediaType
    caption?: string;
    location?:string;
    hashtags?:string;
    media: String[];
    scheduled_time: Date;
}