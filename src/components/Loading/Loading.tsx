import React from "react";
import "./loading.css";

function Loading() {
  return (
    <div className="loading flex-column">
      <div className="loader"></div>
      <p>Conectando a la base de datos...</p>
    </div>
  );
}

export default Loading;