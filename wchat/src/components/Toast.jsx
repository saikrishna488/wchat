import { useEffect, useState } from "react";

const Toast = ({ msg }) => {
  

 

  return (
    <>
        <div className="toast">
          <h3>{msg}</h3>
        </div>
    </>
  );
};

export default Toast;
