import { createSlice } from "@reduxjs/toolkit";

const customerSlice = createSlice({
  name: "customer",
  intialState: {
    customerState: "pending",
    customerData: {},
  },
  reducers: {
    setCustomerState: (state, action) => {
      state.customerState = action.payload;
    },
    setCustomerData: (state, action) => {
      state.customerData = action.payload;
    },
  },
});

export const { setCustomerData, setCustomerState } = customerSlice.actions;
export default customerSlice.reducer;
