import { IAlert } from "./reducer";

export interface AlertState {
    alerts: IAlert[] | null;
    alertsLoading: boolean;
}