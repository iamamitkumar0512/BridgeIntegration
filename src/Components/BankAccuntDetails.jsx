import React from "react";
import { useSelector } from "react-redux";

const BankAccuntDetails = () => {
  const bankData = useSelector((store) => store.bankAccount.bankData);
  return (
    bankData && (
      <div>
        <h1>Bank Account Details</h1>
        <p>Account_id: {bankData.id}</p>
        <p>Customer_id: {bankData.customer_id}</p>
        <p>Created_at: {bankData.created_at}</p>
        <p>Updated_at: {bankData.updated_at}</p>
        <p>Last_4: {bankData.last_4}</p>
        <p>Bank_name: {bankData.bank_name}</p>
        <p>Account_name: {bankData.account_name}</p>
        <p>Account_owner_name: {bankData.account_owner_name}</p>
      </div>
    )
  );
};

export default BankAccuntDetails;
