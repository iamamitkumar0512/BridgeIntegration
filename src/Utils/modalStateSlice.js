import { createSlice } from "@reduxjs/toolkit";
const modalStateSlice = createSlice({
  name: "modalState",
  initialState: {
    tosModalState: false,
    customerModalState: false,
  },

  reducers: {
    setCloseBtn: (state) => {
      state.tosModalState = false;
      state.customerModalState = false;
    },
    setTosModalState: (state) => {
      state.tosModalState = true;
      state.customerModalState = false;
    },
    setcustomerModalState: (state) => {
      state.tosModalState = false;
      state.customerModalState = true;
    },
  },
});

export const { setCloseBtn, setCustomerModaliState, setTosModalState } =
  modalStateSlice.actions;

export default modalStateSlice.reducer;
