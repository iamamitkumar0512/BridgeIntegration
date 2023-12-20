import React, { useRef } from "react";

const EmbeddedUrl = ({ tosUrl }) => {
  const iframeRef = useRef(null);
  console.log(tosUrl, "----");

  const handleMessage = (event) => {
    if (event.origin === "https://dashboard.bridge.xyz") {
      console.log("Received message:", event.data);
    }
  };

  return (
    <div>
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
  );
};

export default EmbeddedUrl;
