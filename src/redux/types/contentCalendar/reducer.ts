import { MediaType } from "@/types";

export interface IScheduledPost {
    media_type: MediaType
    caption?: string;
    description?: string;
    location?:string;
    hashtags?: string[];
    media: string[];
    scheduled_time: Date;
    platform: string[];
}