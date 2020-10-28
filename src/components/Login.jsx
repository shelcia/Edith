import React, { useRef, useState } from "react";
import { Link, useHistory } from "react-router-dom";
import axios from "axios";
import Loading from "./Loading";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
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
      const result = await axios.post(`${URL}api/auth/login`, response);
      setIsLoading(false);
      console.log(result);
      localStorage.setItem(`${PREFIX}token`, result.data.token);
      localStorage.setItem(`${PREFIX}id`, result.data._id);
      history.push(`/user/${result.data._id}`);
    } catch (e) {
      setIsLoading(false);
      errorNotify("Please Check your credentials");
      // console.log(`Axios request failed: ${e}`);
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div
        className='container mt-5 shadow py-3 rounded'
        style={{ maxWidth: "500px" }}>
        <h3 className='text-center'>Login</h3>
        <form className='was-validated' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='uname'>Email:</label>
            <input
              type='email'
              ref={user}
              className='form-control'
              placeholder='Enter email'
              required
            />
            <div className='invalid-feedback'>Please enter valid email.</div>
          </div>
          <div className='form-group'>
            <label htmlFor='pwd'>Password:</label>
            <input
              type='password'
              ref={password}
              className='form-control'
              placeholder='Enter password'
              required
            />
            <div className='invalid-feedback'>Please fill out this field.</div>
          </div>
          <div className='text-center'>
            {isLoading ? (
              <Loading message='Please wait while we verify !' />
            ) : (
              <button type='submit' className='btn btn-primary'>
                Login
              </button>
            )}
          </div>
        </form>
        <div className='text-center mt-5'>
          Don't have an account? then <Link to='/signup'>Signup</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Login;
