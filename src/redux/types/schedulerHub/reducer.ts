export interface IGeneratedCaptionResponseData {
    suggestions: string[] | null;
}

export interface IGeneratedCaptionFormData {
    queryString: string;
}

export interface IFlair {
    _id: string;
    text: string;
}
export interface ISubreddit {
    name: string;
    flairs: IFlair[];
}