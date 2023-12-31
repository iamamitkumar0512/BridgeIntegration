import React from "react";
import styles from "../styles/Username.module.css";
import { Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { setCloseBtn } from "../Utils/modalStateSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import generateUuid from "../Utils/generateUuid";
import { setBankData } from "../Utils/bankAccountSlice";

const AddBankAccount = () => {
  const bankModalState = useSelector(
    (store) => store.modalState.bankModalState
  );
  const customerData = useSelector((store) => store.customer.customerData);
  const customerId = customerData.id;

  const uuid = generateUuid();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      bank_name: "",
      account_number: "",
      routing_number: "",
      account_name: "",
      account_owner_name: "",
      street_line_1: "",
      street_line_2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = {
        type: "raw",
        bank_name: values.bank_name,
        account_number: values.account_number,
        routing_number: values.routing_number,
        account_name: values.account_name,
        account_owner_name: values.account_owner_name,
        active: "true",
        address: {
          street_line_1: values.street_line_1,
          street_line_2: values.street_line_2,
          city: values.city,
          state: values.state,
          postal_code: values.postal_code,
          country: values.country,
        },
      };
      console.log(data);
      try {
        const response = await axios.post(
          `/v0/customers/${customerId}/external_accounts`,
          {
            ...data,
          },
          {
            headers: {
              accepts: "application/json",
              "Api-Key": "",
              "Idempotency-Key": uuid,
            },
          }
        );
        console.log(response.data);
        localStorage.setItem("bankDetails", JSON.stringify(response.data));
        dispatch(setBankData(response.data));
        dispatch(setCloseBtn());
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data.message : error.message
        );
      }
    },
  });

  return bankModalState ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div className="flex justify-center items-center h-screen">
            <div
              className={styles.glass}
              style={{ width: "45%", paddingTop: "1em" }}
            >
              <div className="title p-6 flex flex-row justify-between items-center">
                <h4 className="text-2xl font-bold item-center">
                  Add Bank Account
                </h4>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => dispatch(setCloseBtn())}
                >
                  Close
                </button>
              </div>

              <form className="py-1" onSubmit={formik.handleSubmit}>
                <div className="textbox flex flex-col items-center gap-2">
                  <input
                    {...formik.getFieldProps("bank_name")}
                    className={styles.textbox}
                    type="text"
                    placeholder="bank_name"
                  />
                  <input
                    {...formik.getFieldProps("account_number")}
                    className={styles.textbox}
                    type="text"
                    placeholder="account_number"
                  />
                  <input
                    {...formik.getFieldProps("routing_number")}
                    className={styles.textbox}
                    type="text"
                    placeholder="routing_number"
                  />
                  <input
                    {...formik.getFieldProps("account_name")}
                    className={styles.textbox}
                    type="text"
                    placeholder="account_name"
                  />
                  <input
                    {...formik.getFieldProps("account_owner_name")}
                    className={styles.textbox}
                    type="text"
                    placeholder="account_owner_name"
                  />

                  <input
                    {...formik.getFieldProps("street_line_1")}
                    className={styles.textbox}
                    type="text"
                    placeholder="street_line_1"
                  />
                  <input
                    {...formik.getFieldProps("street_line_2")}
                    className={styles.textbox}
                    type="text"
                    placeholder="street_line_2"
                  />
                  <input
                    {...formik.getFieldProps("city")}
                    className={styles.textbox}
                    type="text"
                    placeholder="city"
                  />
                  <input
                    {...formik.getFieldProps("state")}
                    className={styles.textbox}
                    type="text"
                    placeholder="state"
                  />
                  <input
                    {...formik.getFieldProps("postal_code")}
                    className={styles.textbox}
                    type="text"
                    placeholder="postal_code"
                  />
                  <input
                    {...formik.getFieldProps("country")}
                    className={styles.textbox}
                    type="text"
                    placeholder="country"
                  />
                  <button className={styles.btn} type="submit">
                    Add
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default AddBankAccount;
