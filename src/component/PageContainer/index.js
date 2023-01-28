import React from "react";

const index = ({ children }) => {
  return (
    <div
      style={{
        maxWidth: 1300,
        margin: "0 auto",
      }}
    >
      {children}
    </div>
  );
};

export default index;
