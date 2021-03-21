import React from "react";
import { Link } from "react-router-dom";
import Instructions from "../components/Instructions";

const HomePage = () => {
  return (
    <React.Fragment>
      <div
        className="container my-5 shadow py-3 rounded"
        style={{ maxWidth: "600px" }}
      >
        <h3 style={{ borderLeft: "3.5px solid red" }} className="pl-3">
          EdiTH CTF
        </h3>
        <hr />
        <Instructions />
        <hr />
        <div className="text-center d-flex align-item-center justify-content-between w-50 mx-auto">
          <Link to="/signup">Signup</Link>
          <Link to="/login">Login</Link>
        </div>
      </div>
      <div
        className="container-fluid shadow mb-0 pb-0 border-bottom text-center"
        id="footer"
      >
        <p className="pt-4 text-muted">
          © Crafted and Developed by WebOps Team 2020😎
        </p>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
