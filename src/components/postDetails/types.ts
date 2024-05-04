import { IScheduledPost } from "@/redux/types/contentCalendar/reducer";

export interface IPostDetailsProps {
    selectedPost: IScheduledPost | null;
    sidebarVisible: boolean;
    closeSidebar: () => void;
}