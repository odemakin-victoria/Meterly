import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { GetRecentTransaction, NipBank } from "../types/transfer";
import { logUserOut } from "./UserSlice";

export type TransactionsState = {
  recent: GetRecentTransaction[];
  shouldRefetchRecent: boolean;
};

const initialState: TransactionsState = {
  recent: [],
  shouldRefetchRecent: true,
};

const Transactionslice = createSlice({
  name: "transaction",
  initialState,
  extraReducers(builder) {
    builder.addCase(logUserOut.type, (state, action) => {
      return initialState;
    });
  },
  reducers: {
    setRecentTransactions: (
      state: TransactionsState,
      action: PayloadAction<GetRecentTransaction[] | null>
    ) => {
      if (action.payload) state.recent = action.payload;
    },
    toggleShouldFetchRecent: (state: TransactionsState) => {
      state.shouldRefetchRecent = !state.shouldRefetchRecent;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecentTransactions, toggleShouldFetchRecent } =
  Transactionslice.actions;

export default Transactionslice.reducer;
