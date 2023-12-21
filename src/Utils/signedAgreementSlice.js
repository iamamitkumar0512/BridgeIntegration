import { createSlice } from "@reduxjs/toolkit";

const signedAgreementSlice = createSlice({
  name: "signedAgreement",
  initialState: {
    signedAgreementId: "",
  },
  reducers: {
    setSignedAgreementId: (state, action) => {
      state.signedAgreementId = action.payload;
    },
  },
});

export const { setSignedAgreementId } = signedAgreementSlice.actions;
export default signedAgreementSlice.reducer;
