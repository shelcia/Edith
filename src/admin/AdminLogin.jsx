import React, { useRef, useState } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "../components/Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const AdminLogin = () => {
  const user = useRef(null);
  const password = useRef(null);
  const history = useHistory();
  const [isLoading, setIsLoading] = useState(false);

  const errorNotify = (message) => {
    toast.error(message);
  };

  const onSubmit = async (event) => {
    event.preventDefault();
    setIsLoading(true);
    const PREFIX = "Edith-";

    const URL = process.env.REACT_APP_HEROKU_LINK;

    const response = {
      email: user.current.value,
      password: password.current.value,
    };

    try {
      const result = await axios.post(`${URL}api/admin/admin/login`, response);
      console.log(result);
      if (result.data.status === "200") {
        setIsLoading(false);
        localStorage.setItem(`${PREFIX}admin-token`, result.data.message);
        history.push(`/admin/jithujiladimittakilaadi`);
      } else {
        setIsLoading(false);
        errorNotify(result.data.message);
      }
    } catch (e) {
      setIsLoading(false);
      errorNotify("Please Check your credentials🧟‍♀️");
      console.log(`Axios request failed: ${e}`);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div
        className="container mt-5 shadow py-3 rounded"
        style={{ maxWidth: "500px" }}
      >
        <h3 style={{ borderLeft: "3.5px solid red" }} className="pl-3">
          Login
        </h3>
        <hr />
        <form className="was-validated" onSubmit={onSubmit}>
          <div className="form-group">
            <label htmlFor="uname">Email:</label>
            <input
              type="email"
              ref={user}
              className="form-control"
              placeholder="Enter email"
              required
            />
            <div className="invalid-feedback">Please enter valid email.</div>
          </div>
          <div className="form-group">
            <label htmlFor="pwd">Password:</label>
            <input
              type="password"
              ref={password}
              className="form-control"
              placeholder="Enter password"
              required
            />
            <div className="invalid-feedback">Please fill out this field.</div>
          </div>
          <div className="text-center">
            {isLoading ? (
              <Loading message="Please wait while we verify !" />
            ) : (
              <button type="submit" className="btn btn-primary">
                Login
              </button>
            )}
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default AdminLogin;
