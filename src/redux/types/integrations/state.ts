import { IIntegration } from "./reducer";

export interface IntegrationsState {
    integrations: IIntegration[] | null,
    integrationsLoading: boolean
}