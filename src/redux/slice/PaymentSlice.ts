import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
//import {GetRecentTransaction, NipBank} from '../types/transfer';
import {
  FetchBillersCategoriesResponse,
  GetRecentBillTransaction,
} from "../types/payment";
import { logUserOut } from "./UserSlice";

export type PaymentsState = {
  recent: GetRecentBillTransaction[];
  categories: FetchBillersCategoriesResponse[];
};

const initialState: PaymentsState = {
  recent: [],
  categories: [],
};

const PaymentSlice = createSlice({
  name: "payment",
  initialState,
  extraReducers(builder) {
    builder.addCase(logUserOut.type, (state, action) => {
      return initialState;
    });
  },
  reducers: {
    setRecentBillTransactions: (
      state: PaymentsState,
      action: PayloadAction<GetRecentBillTransaction[] | null>
    ) => {
      if (action.payload) state.recent = action.payload;
    },
    setBillCategories: (
      state: PaymentsState,
      action: PayloadAction<FetchBillersCategoriesResponse[] | null>
    ) => {
      if (action.payload) state.categories = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const { setRecentBillTransactions } = PaymentSlice.actions;

export default PaymentSlice.reducer;
