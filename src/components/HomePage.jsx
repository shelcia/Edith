import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  return (
    <React.Fragment>
      <div
        className='container mt-5 shadow py-3 rounded'
        style={{ maxWidth: "500px" }}>
        <Link to='/signup'>Signup</Link>
        <Link to='/login'>Login</Link>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
