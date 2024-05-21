import { Country, Gender, Industry } from "@/types";

interface IDemographics {
    age: number;
    gender: Gender;
    location: Country;
}

export interface IInfluencer {
    _id: string;
    name: string;
    username: string;
    industry: Industry[];
    demographics: IDemographics;
    follower_count: number;
    email: string;
}

export interface UpdateInfluencerDto {
    influencer_id: string;
}