import React, { useRef } from "react";
import { Toaster } from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setSignedAgreementId } from "../Utils/signedAgreementSlice";
import { setCloseBtn, setCustomerModalState } from "../Utils/modalStateSlice";
import { useSelector } from "react-redux";
import store from "../Utils/store";

const EmbeddedUrl = ({ tosUrl }) => {
  const tosModalState = useSelector((store) => store.modalState.tosModalState);
  const iframeRef = useRef(null);
  console.log(tosUrl, "----");
  const dispatch = useDispatch();

  const handleMessage = (event) => {
    if (event.origin === "https://dashboard.bridge.xyz") {
      console.log("Received message:", event.data);
      localStorage.setItem("signedAgreementId", event.data.signedAgreementId);
      dispatch(setSignedAgreementId(event.data.signedAgreementId));
      dispatch(setCloseBtn());
      dispatch(setCustomerModalState());
    }
  };

  return tosModalState ? (
    <>
      <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-50 outline-none focus:outline-none">
        <div className="container  mx-auto">
          <Toaster position="top-center" reverseOrder={false}></Toaster>
          <div className="flex flex-col justify-center items-center h-screen">
            <div
              className="bg-slate-500"
              style={{ width: "80%", paddingTop: "1em" }}
            >
              <div className="title flex flex-row justify-between items-center">
                <h4 className="text-2xl font-bold item-center">TOS Screen</h4>
                <button
                  className="bg-red-500 text-white active:bg-red-600 font-bold uppercase text-sm px-2 py-1 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 ease-linear transition-all duration-150"
                  type="button"
                  onClick={() => dispatch(setCloseBtn())}
                >
                  Close
                </button>
              </div>

              <div className="p-6">
                <iframe
                  ref={iframeRef}
                  title="Embedded URL"
                  src={tosUrl}
                  width="600"
                  height="400"
                  allowFullScreen
                  onLoad={() => console.log("Iframe loaded")}
                />
                {window.addEventListener("message", handleMessage)}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  ) : null;
};

export default EmbeddedUrl;
