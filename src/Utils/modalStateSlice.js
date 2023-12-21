import { createSlice } from "@reduxjs/toolkit";

const modalStateSlice = createSlice({
  name: "modalState",
  initialState: {
    tosModalState: false,
    customerModalState: false,
    bankModalState: false,
  },

  reducers: {
    setCloseBtn: (state) => {
      state.tosModalState = false;
      state.customerModalState = false;
      state.bankModalState = false;
    },
    setTosModalState: (state) => {
      state.tosModalState = true;
      state.customerModalState = false;
      state.bankModalState = false;
    },
    setCustomerModalState: (state) => {
      state.tosModalState = false;
      state.customerModalState = true;
      state.bankModalState = false;
    },
    setBankModalState: (state) => {
      state.tosModalState = false;
      state.customerModalState = false;
      state.bankModalState = true;
    },
  },
});

export const {
  setCloseBtn,
  setCustomerModalState,
  setTosModalState,
  setBankModalState,
} = modalStateSlice.actions;

export default modalStateSlice.reducer;
