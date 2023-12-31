import React from "react";
import styles from "../styles/Username.module.css";
import { toast, Toaster } from "react-hot-toast";
import { useFormik } from "formik";
import { setCloseBtn } from "../Utils/modalStateSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import generateUuid from "../Utils/generateUuid";
import { setCustomerData, setCustomerState } from "../Utils/customerSlice";

const CustomerRegisterModal = () => {
  const customerModalState = useSelector(
    (store) => store.modalState.customerModalState
  );
  const signedAgreementId = useSelector(
    (store) => store.signedAgreement.signedAgreementId
  );
  const uuid = generateUuid();
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      firstName: "",
      lastName: "",
      mobile: "",
      email: "",
      street_line_1: "",
      street_line_2: "",
      city: "",
      state: "",
      postal_code: "",
      country: "",
      birth_date: "",
      tax_identification_number: "",
    },
    validateOnBlur: false,
    validateOnChange: false,
    onSubmit: async (values) => {
      const data = {
        type: "individual",
        first_name: values.firstName,
        last_name: values.lastName,
        email: values.email,
        phone: values.mobile,
        address: {
          street_line_1: values.street_line_1,
          street_line_2: values.street_line_2,
          city: values.city,
          state: values.state,
          postal_code: values.postal_code,
          country: values.country,
        },
        signed_agreement_id: signedAgreementId,
        birth_date: values.birth_date,
        tax_identification_number: values.tax_identification_number,
      };
      console.log(data);
      try {
        const response = await axios.post(
          "/v0/customers",
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
        localStorage.setItem("customerData", JSON.stringify(response.data));
        dispatch(setCustomerData(response.data));
        dispatch(setCustomerState(response.data.state));
        dispatch(setCloseBtn());
      } catch (error) {
        console.error(
          "Error:",
          error.response ? error.response.data.message : error.message
        );
      }
    },
  });

  return customerModalState ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container mx-auto">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div className="flex justify-center items-center h-screen">
            <div
              className={styles.glass}
              style={{ width: "45%", paddingTop: "1em" }}
            >
              <div className="title flex flex-row justify-between items-center">
                <h4 className="text-2xl font-bold item-center">Register</h4>
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
                    {...formik.getFieldProps("firstName")}
                    className={styles.textbox}
                    type="text"
                    placeholder="First Name*"
                  />
                  <input
                    {...formik.getFieldProps("lastName")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Last Name*"
                  />
                  <input
                    {...formik.getFieldProps("mobile")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Phone Number*"
                  />
                  <input
                    {...formik.getFieldProps("email")}
                    className={styles.textbox}
                    type="text"
                    placeholder="Email*"
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

                  <input
                    {...formik.getFieldProps("birth_date")}
                    className={styles.textbox}
                    type="text"
                    placeholder="birth_date"
                  />
                  <input
                    {...formik.getFieldProps("tax_identification_number")}
                    className={styles.textbox}
                    type="text"
                    placeholder="tax_identification_number"
                  />
                  <button className={styles.btn} type="submit">
                    Register
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

export default CustomerRegisterModal;
