import React from "react";
import loadingGif from "../images/Spinner2.svg";
const Loading = () => {
  return (
    <div class=" h-100 d-flex justify-content-center align-items-center">
      <div className="loading">
        <img src={loadingGif} alt="" />
      </div>
    </div>
  );
};

export default Loading;
