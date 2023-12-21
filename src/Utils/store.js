import { configureStore } from "@reduxjs/toolkit";
import customerSlice from "./customerSlice";
import signedAgreementSlice from "./signedAgreementSlice";
import modalStateSlice from "./modalStateSlice";
const store = configureStore({
  reducer: {
    customer: customerSlice,
    signedAgreement: signedAgreementSlice,
    modalState: modalStateSlice,
  },
});

export default store;
