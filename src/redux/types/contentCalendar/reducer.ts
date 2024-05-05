import { MediaType } from "@/types";
export interface IScheduledPost {
    _id: string;
    media_type: MediaType
    caption?: string;
    description?: string;
    location?:string;
    hashtags?: string[];
    media: string[];
    scheduled_time: Date;
    platform: string[];
}

export interface IUpdateScheduledPostData extends Partial<IScheduledPost> {}