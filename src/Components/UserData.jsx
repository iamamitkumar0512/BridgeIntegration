import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { setCustomerState } from "../Utils/customerSlice";
import AddBankAccount from "./AddBankAccount";
import { setBankModalState } from "../Utils/modalStateSlice";
import BankAccuntDetails from "./BankAccuntDetails";
import { setBankData } from "../Utils/bankAccountSlice";

const UserData = () => {
  const dispatch = useDispatch();
  const customerData = useSelector((store) => store.customer.customerData);
  const customerState = useSelector((store) => store.customer.customerState);
  const customerId = customerData.id;
  console.log(customerState);
  const makeApiCall = async () => {
    try {
      const response = await axios.get(`/v0/customers/${customerId}`, {
        headers: {
          "Api-Key": "",
        },
      });
      console.log(response.data);
      dispatch(setCustomerState(response.data.status));
      dispatch(setBankData(JSON.parse(localStorage.getItem("bankDetails"))));
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  };
  const handelOnclick = async () => {
    await makeApiCall();
  };
  return (
    <div className="m-4 p-6">
      <h1 className="p-6">UserData</h1>
      <p>Created At: {customerData.created_at}</p>
      <p>Email: {customerData.email}</p>
      <p>
        State: {customerState === "active" ? customerState : customerData.state}
      </p>
      <p>fullName: {customerData.full_name}</p>
      <p>Id: {customerData.id}</p>
      <button
        onClick={handelOnclick}
        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        Refresh State
      </button>
      {customerState === "active" && (
        <button
          onClick={() => dispatch(setBankModalState())}
          className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
        >
          Add BankAccount
        </button>
      )}
      <AddBankAccount />
      <div className="m-6 p-6">
        <BankAccuntDetails />
      </div>
    </div>
  );
};

export default UserData;
