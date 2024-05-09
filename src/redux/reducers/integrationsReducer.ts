import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IntegrationsState } from "../types/integrations/state";
import { IIntegration } from "../types/integrations/reducer";

const initialState: IntegrationsState = {
    integrations: null,
    integrationsLoading: false
};

const integrationsSlice = createSlice({
  name: "integrations",
  initialState,
  reducers: {
    getIntegrationsSuccess: (
      state,
      { payload }: PayloadAction<IIntegration[]>
    ) => {
      state.integrationsLoading = true;
      state.integrations = payload;
      state.integrationsLoading = false;
    },
    getIntegrationsFailure: (state) => {
      state.integrationsLoading = false;
    },
    IntegrationsReset: () => {
      return initialState;
    },
  },
});

export const {
  getIntegrationsSuccess,
  getIntegrationsFailure,
  IntegrationsReset
} = integrationsSlice.actions;

export default integrationsSlice.reducer;

export const IntegrationsSelector = (state: {
    integrations: IntegrationsState;
}): IntegrationsState => {
  return state.integrations;
};
