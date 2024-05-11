import { MediaType } from "@/types";
export interface IScheduledPost {
    _id: string;
    media_type: MediaType
    caption?: string;
    description?: string;
    location?:string;
    hashtags?: string[];
    tagged_accounts?: string[];
    media: string[];
    scheduled_time: Date;
    platform: string[];
}

export interface CreateScheduledPostDto {
    media_type: MediaType;
    caption: string | null;
    description: string | null;
    location:string | null;
    hashtags: string[] | [];
    tagged_accounts: string[] | [];
    // media: (string | undefined)[] | [];
    scheduled_time: Date | null;
    platform: string[] | [];    
    file: any;
}

export interface IUpdateScheduledPostData extends Partial<IScheduledPost> {}