import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type SignupFlow = {
  flowType: string;
};

const initialState: SignupFlow = {
  flowType: "",
};

const SignupSlice = createSlice({
  name: "signupflow",
  initialState,
  reducers: {
    changeFlowType: (state: SignupFlow, action: PayloadAction<string>) => {
      state.flowType = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { changeFlowType } = SignupSlice.actions;

export default SignupSlice.reducer;
