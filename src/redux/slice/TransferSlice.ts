import {createSlice} from '@reduxjs/toolkit';
import type {PayloadAction} from '@reduxjs/toolkit';
import {GetRecentTransaction, NipBank} from '../types/transfer';
import {logUserOut} from './UserSlice';

export type TransferState = {
  banks: NipBank[];
};

const initialState: TransferState = {
  banks: [],
};

const Transactionslice = createSlice({
  name: 'transfer',
  initialState,
  extraReducers(builder) {
    builder.addCase(logUserOut.type, (state, action) => {
      return initialState;
    });
  },
  reducers: {
    setNipBanks: (
      state: TransferState,
      action: PayloadAction<NipBank[] | null>,
    ) => {
      if (action.payload) state.banks = action.payload;
    },
  },
});

// Action creators are generated for each case reducer function
export const {setNipBanks} = Transactionslice.actions;

export default Transactionslice.reducer;
