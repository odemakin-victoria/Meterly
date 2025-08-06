// import {createSlice} from '@reduxjs/toolkit';
// import type {PayloadAction} from '@reduxjs/toolkit';
// import {FetchUserAccountsResponse} from '../types/account';
// import {Console} from '../../utils';
// import {logUserOut} from './UserSlice';

// export type AccountState = FetchUserAccountsResponse[];

// const initialState: AccountState = [];

// const UserAccountsSlice = createSlice({
//   name: 'useraccounts',
//   initialState,
//   extraReducers(builder) {
//     builder.addCase(logUserOut.type, (state, action) => {
//       return initialState;
//     });
//   },
//   reducers: {
//     setUserAccounts: (
//       state: AccountState,
//       action: PayloadAction<AccountState>,
//     ) => {
//       return action.payload;
//     },
//   },
// });

// // Action creators are generated for each case reducer function
// export const {setUserAccounts} = UserAccountsSlice.actions;

// export default UserAccountsSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { FetchUserAccountsResponse } from "../types/account";
import { Console } from "../../utils";
import { logUserOut } from "./UserSlice";

export interface AccountState {
  accounts: FetchUserAccountsResponse[];
  hasChanged: boolean;
}

const initialState: AccountState = {
  accounts: [],
  hasChanged: false,
};

const UserAccountsSlice = createSlice({
  name: "useraccounts",
  initialState,
  extraReducers(builder) {
    builder.addCase(logUserOut.type, (state, action) => {
      return initialState;
    });
  },
  reducers: {
    setUserAccounts: (
      state: AccountState,
      action: PayloadAction<FetchUserAccountsResponse[]>
    ) => {
      state.accounts = action.payload
    },
    toggleAccountsChanged: (state) => {
      state.hasChanged = !state.hasChanged;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setUserAccounts, toggleAccountsChanged } =
  UserAccountsSlice.actions;

export default UserAccountsSlice.reducer;
