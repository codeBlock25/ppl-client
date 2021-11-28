import React from "react";

export default function Loader() {
  return (
    <>
      <div id="loader">
        <div className="content">
          <div className="loader_spinner"></div>
          <p className="loader_text">Loading Credentials...</p>
        </div>
      </div>
    </>
  );
}
