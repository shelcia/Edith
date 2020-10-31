import React from "react";

const NoEntry = () => {
  return (
    <React.Fragment>
      <div
        className='container mt-5 shadow py-3 rounded'
        style={{ maxWidth: "500px" }}>
        <h3 style={{ borderLeft: "3.5px solid red" }} className='pl-3'>
          No entry !
        </h3>
        <hr />
        <div
          className='container-fluid d-flex align-items-center justify-content-center flex-column'
          //   style={{ height: "100vh" }}
        >
          <p>You cannot participate more than once !!!🚨🚨</p>
          <p>
            Meanwhile you can check us on our social media or{" "}
            <a href='/'>go home</a>
          </p>
          <div className='d-flex align-items-center justify-content-between w-75'>
            <a href='https://github.com/IIITDM-CS-CLUB'>Github</a>
            <a href='https://www.instagram.com/cs.club.iiitdm/'>Instagram</a>
            <a href='https://www.facebook.com/csclubiiitdm'>Facebook</a>
          </div>
          <p className='mt-3'>
            Think it's a mistake ? 🤔🤔 then call us at{" "}
            <a href='mailto:coe18b046@iiitdm.ac.in'>coe18b046@iiitdm.ac.in</a>
          </p>
        </div>
      </div>
    </React.Fragment>
  );
};

export default NoEntry;
