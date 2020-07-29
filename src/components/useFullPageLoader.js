import React, { useState } from "react";

const useFullPageLoader = () => {
  const [loading, setLoading] = useState(false);

  return [
    loading ? <h4>Hello</h4> : null,
    () => setLoading(true), //Show loader
    () => setLoading(false), //Hide Loader
  ];
};

export default useFullPageLoader;
