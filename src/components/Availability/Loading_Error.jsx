import React from "react";
import { useSelector } from "react-redux";

function Loading() {
  const loading = useSelector((state) => state.rootReducer.loading);
  const error = useSelector((state) => state.rootReducer.error);
  return (
    <div>
      {loading && <h1 style={{ color: "#730C00" }}>loading...</h1>}
      {error && !loading && <h3 style={{ color: "#730C00" }}>{error}</h3>}
    </div>
  );
}

export default Loading;
