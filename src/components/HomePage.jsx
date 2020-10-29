import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <React.Fragment>
      <div
        className='container mt-5 shadow py-3 rounded'
        style={{ maxWidth: "500px" }}>
        <h3 style={{ borderLeft: "3.5px solid red" }} className='pl-3'>
          Edith Club
        </h3>
        <hr />
        <h5>Instructions</h5>
        <ul>
          <li>lorem ipsum lut delsel</li>
          <li>lorem ipsum lut delsel</li>
          <li>lorem ipsum lut delsel</li>
          <li>lorem ipsum lut delsel</li>
        </ul>
        <hr />
        <div className='text-center d-flex align-item-center justify-content-between w-50 mx-auto'>
          <Link to='/signup'>Signup</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
