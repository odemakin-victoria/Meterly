import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { Beneficiary } from "../types/transfer";
import { logUserOut } from "./UserSlice";

export type BeneficiaryState = {
  list: Beneficiary[];
};

const initialState: BeneficiaryState = {
  list: [],
};

const arrangeItemsAlphabetically = (list: Beneficiary[]) => {
  return list.sort((a, b) => {
    let aname = a.BeneficiaryName || "";
    let bname = b.BeneficiaryName || "";
    return aname.trim().toLowerCase().localeCompare(bname.trim().toLowerCase());
  });
};

const BeneficiarySlice = createSlice({
  name: "beneficiary",
  initialState,
  extraReducers(builder) {
    builder.addCase(logUserOut.type, (state, action) => {
      return initialState;
    });
  },
  reducers: {
    setBeneficiaries: (
      state: BeneficiaryState,
      action: PayloadAction<Beneficiary[] | null>
    ) => {
      if (action.payload)
        state.list = arrangeItemsAlphabetically(action.payload);
    },
    addToBeneficiaries: (
      state: BeneficiaryState,
      action: PayloadAction<Beneficiary | null>
    ) => {
      if (action.payload) {
        state.list.push(action.payload);
        state.list = arrangeItemsAlphabetically(state.list);
      }
    },
    deleteFromBeneficiaries: (
      state: BeneficiaryState,
      action: PayloadAction<string | number>
    ) => {
      if (action.payload)
        state.list = arrangeItemsAlphabetically(
          state.list.filter(
            (item) => String(item.BeneficiaryId) != action.payload
          )
        );
    },
  },
});

// Action creators are generated for each case reducer function
export const { setBeneficiaries, addToBeneficiaries, deleteFromBeneficiaries } =
  BeneficiarySlice.actions;

export default BeneficiarySlice.reducer;
