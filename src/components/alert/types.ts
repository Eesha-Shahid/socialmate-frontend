import { NotificationArgsProps } from "antd";

export interface IAlertProps {
  placement?: NotificationArgsProps['placement'];
  duration?: number;
  threshold?: number;
  stacked?: boolean;
}