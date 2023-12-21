import React, { useEffect } from "react";
import { useState } from "react";
import generateUuid from "../Utils/generateUuid";
import axios from "axios";
import EmbeddedUrl from "./EmbededUrl";
import CustomerRegisterModal from "./CustomerRegisterModal";
const Bridge = () => {
  const [data, setData] = useState();
  const [showIframe, setShowIfram] = useState(false);
  const uuid = generateUuid();

  const makeApiCalltos = async () => {
    try {
      const response = await axios.post(
        "/v0/customers/tos_links",
        {},
        {
          headers: {
            accepts: "application/json",
            "Api-Key": "sk-test-c0b80685ba650b2bf2bf5b9c69bcb1db",
            "Idempotency-Key": uuid,
          },
        }
      );
      console.log(response.data);
      setData(response.data);
      setShowIfram(true);
    } catch (error) {
      setShowIfram(false);
      console.error(
        "Error:",
        error.response ? error.response.data.message : error.message
      );
    }
  };
  const handelOnclick = async () => {
    await makeApiCalltos();
  };

  return (
    <div>
      <button
        onClick={handelOnclick}
        className="focus:outline-none text-white bg-yellow-400 hover:bg-yellow-500 focus:ring-4 focus:ring-yellow-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:focus:ring-yellow-900"
      >
        deposit
      </button>
      {showIframe && data && <EmbeddedUrl tosUrl={data.url} />}
      <CustomerRegisterModal />
    </div>
  );
};

export default Bridge;
