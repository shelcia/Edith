import React from "react";

const NoEntry = () => {
  return (
    <React.Fragment>
      <div
        className='container-fluid d-flex align-items-center justify-content-center flex-column'
        style={{ height: "100vh" }}>
        <p>You cannot participate more than once !!!🚨🚨</p>
        <p>
          Meanwhile you can check us on our social media or{" "}
          <a href='/'>go home</a>
        </p>
        <div className='d-flex align-items-center justify-content-between w-25'>
          <a href='https://github.com/IIITDM-CS-CLUB'>Github</a>
          <a href='https://www.instagram.com/cs.club.iiitdm/'>Instagram</a>
          <a href='https://www.facebook.com/csclubiiitdm'>Facebook</a>
        </div>
        <p className='mt-3'>
          Think it's a mistake ? 🤔🤔 then call us at 9999999999
        </p>
      </div>
    </React.Fragment>
  );
};

export default NoEntry;
