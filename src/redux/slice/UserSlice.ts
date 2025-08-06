import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export type UserState = {
	HasSecurityQuestions: boolean;
  loggedIn?: boolean;
  accessToken?: string | null;
  refreshToken?: string | null;
  cifid?: string | null;
  deviceId?: string | null;
  authTokenDesc?: string;
  authTokenType?: number | null;
  updateRequired?: boolean;
  forceUpdateRequired?: boolean;
  ProfilePictureURI: string | null;
  email?: string | null;
  HasTransactionPin?: boolean;
  MaxUnauthorizedTransactionValue?: number;
  PrimaryAccountNumber?: string;
  fullName?: string | null;
  username?: string | null;
  kycLevel?: string | number;
};

const initialState: UserState = {
  loggedIn: false,
  authTokenDesc: "",
  authTokenType: null,
  PrimaryAccountNumber: "",
  accessToken: "",
  updateRequired: false,
  forceUpdateRequired: false,
  cifid: "",
  ProfilePictureURI: "",
  deviceId: "",
  MaxUnauthorizedTransactionValue: 0,
  username: "",
  email: "",
  fullName: "",
  kycLevel: "",
};

const UserSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    setUser: (state: UserState, action: PayloadAction<UserState>) => {
      return { ...state, ...action.payload };
    },
    logUserOut: (state: UserState) => {
      return { ...initialState, username: state.username, email: state.email };
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUser, logUserOut } = UserSlice.actions;

export default UserSlice.reducer;
