import { configureStore } from "@reduxjs/toolkit";
import { api } from "../api";
import UserSlice from "../slice/UserSlice";
import { rtkQueryErrorHandler } from "../middleware/errorhandler";
import { setupListeners } from "@reduxjs/toolkit/query";
import SettingsSlice from "../slice/SettingsSlice";
import UserAccountsSlice from "../slice/UserAccountsSlice";
import TransactionsSlice from "../slice/TransactionsSlice";
import TransferSlice from "../slice/TransferSlice";
import BeneficiarySlice from "../slice/BeneficiarySlice";
import PaymentSlice from "../slice/PaymentSlice";
import SignupSlice from "../slice/SignupSlice";

export const store = configureStore({
  reducer: {
     user: UserSlice,
    useraccounts: UserAccountsSlice,
    transactions: TransactionsSlice,
    payments: PaymentSlice,
    settings: SettingsSlice,
    transfer: TransferSlice,
    beneficiaries: BeneficiarySlice,
    signupFlow: SignupSlice,
    // Add the generated reducer as a specific top-level slice
    [api.reducerPath]: api.reducer,
  },
  // Adding the api middleware enables caching, invalidation, polling,
  // and other useful features of `rtk-query`.
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: false,
    }).concat([api.middleware, rtkQueryErrorHandler]),
});

// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<typeof store.getState>;
// Inferred type: {posts: PostsState, comments: CommentsState, users: UsersState}
export type AppDispatch = typeof store.dispatch;

setupListeners(store.dispatch);
