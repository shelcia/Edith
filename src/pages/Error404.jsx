import React from "react";
import { Link } from "react-router-dom";

const Error = () => {
  return (
    <React.Fragment>
      <div
        className='container mt-5 shadow py-3 rounded'
        style={{ maxWidth: "500px" }}>
        <h3 style={{ borderLeft: "3.5px solid red" }} className='pl-3'>
          EdiTH Club
        </h3>
        <hr />

        <div className='d-flex align-items-center justify-content-center flex-column'>
          <p>Error 404 !! page not found...</p>
          <Link to='/'>Go home</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Error;
