import React from "react";
import { useState } from "react";
import generateUuid from "../Utils/generateUuid";
import axios from "axios";
import EmbeddedUrl from "./EmbededUrl";
import CustomerRegisterModal from "./CustomerRegisterModal";
import { useDispatch } from "react-redux";
import { setSignedAgreementId } from "../Utils/signedAgreementSlice";
import {
  setCloseBtn,
  setCustomerModalState,
  setTosModalState,
} from "../Utils/modalStateSlice";
import { useSelector } from "react-redux";
import store from "../Utils/store";
import { setCustomerData } from "../Utils/customerSlice";
import { useNavigate } from "react-router-dom";

const Bridge = () => {
  const navigate = useNavigate();
  const [data, setData] = useState();
  const tosModalState = useSelector((store) => store.modalState.tosModalState);
  const customerModalState = useSelector(
    (store) => store.modalState.customerModalState
  );
  const signedAgreementId = useSelector(
    (store) => store.signedAgreement.signedAgreementId
  );
  console.log(tosModalState, customerModalState, signedAgreementId);
  const uuid = generateUuid();
  const dispatch = useDispatch();

  const makeApiCalltos = async () => {
    try {
      const response = await axios.post(
        "/v0/customers/tos_links",
        {},
        {
          headers: {
            accepts: "application/json",
            "Api-Key": "",
            "Idempotency-Key": uuid,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      dispatch(setTosModalState());
    } catch (error) {
      dispatch(setCloseBtn());
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  };
  const handelOnclick = async () => {
    if (localStorage.getItem("signedAgreementId")) {
      dispatch(setCloseBtn());
      dispatch(setSignedAgreementId(localStorage.getItem("signedAgreementId")));
      if (localStorage.getItem("customerData")) {
        dispatch(
          setCustomerData(JSON.parse(localStorage.getItem("customerData")))
        );
        navigate("/customerData");
      } else dispatch(setCustomerModalState());
    } else await makeApiCalltos();
  };

  return (
    <div>
      <button
        onClick={handelOnclick}
        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        deposit
      </button>
      {data && tosModalState && <EmbeddedUrl tosUrl={data.url} />}
      {customerModalState && signedAgreementId && <CustomerRegisterModal />}
    </div>
  );
};

export default Bridge;
