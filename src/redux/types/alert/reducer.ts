import { NotificationType } from "@/types";
import { NotificationArgsProps } from "antd";
type NotificationPlacement = NotificationArgsProps['placement'];

export interface IAlert {
    id: string;
    type: NotificationType;
    message?: string;
    description?: string;
    duration?: number;
    placement?: NotificationPlacement
    shown: boolean;
}