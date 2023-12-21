import { configureStore } from "@reduxjs/toolkit";
import signedAgreementSlice from "./signedAgreementSlice";
import modalStateSlice from "./modalStateSlice";
import customerSlice from "./customerSlice";
import bankAccountSlice from "./bankAccountSlice";
const store = configureStore({
  reducer: {
    signedAgreement: signedAgreementSlice,
    modalState: modalStateSlice,
    customer: customerSlice,
    bankAccount: bankAccountSlice,
  },
});

export default store;
