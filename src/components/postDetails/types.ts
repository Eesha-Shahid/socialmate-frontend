import { IScheduledPost } from "@/redux/types/contentCalendar/reducer";

export interface IPostDetailsProps {
    selectedPost: IScheduledPost;
    sidebarVisible: boolean;
    closeSidebar: () => void;
}