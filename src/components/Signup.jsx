import React, { useRef, useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

const Signup = () => {
  const [isLoading, setIsLoading] = useState(false);

  const name = useRef(null);

  const user = useRef(null);
  const password = useRef(null);

  const errorNotify = (message) => {
    toast.error(message);
  };
  const successNotify = (message) => {
    toast.success(message);
  };

  const onSubmit = async (event) => {
    event.preventDefault();

    if (password.current.value.length < 6) {
      errorNotify("Your password should have atleast 6 characters  👻");
      return;
    }

    setIsLoading(true);
    const URL = process.env.REACT_APP_HEROKU_LINK;

    const response = {
      name: name.current.value,
      email: user.current.value,
      password: password.current.value,
      point: 0,
      isParticipated: false,
    };

    try {
      await axios.post(`${URL}api/auth/register`, response);
      setIsLoading(false);
      successNotify("Signup Successfull ! Please Login to continue..👩🏽‍💻 ");
    } catch (e) {
      setIsLoading(false);
      console.log(`Axios request failed: ${e}`);
      errorNotify("Either User already exists or check your connection");
    }
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div
        className='container my-5 shadow py-3 rounded'
        style={{ maxWidth: "500px" }}>
        <h3 style={{ borderLeft: "3.5px solid red" }} className='pl-3'>
          Signup
        </h3>
        <hr />
        <form className='was-validated' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='uname'>Name:</label>
            <input
              type='text'
              ref={name}
              className='form-control'
              placeholder='Enter name'
              required
            />
            <div className='invalid-feedback'>Please fill out your name.</div>
          </div>
          <div className='form-group'>
            <label htmlFor='email'>Email:</label>
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
            <div className='text-danger my-4' style={{ fontSize: "0.8rem" }}>
              <p>
                Your password should have {"  "} <strong>6 characters</strong>{" "}
                atleast !!🚨🚨
              </p>
            </div>
            <div className='invalid-feedback'>Please fill out this field.</div>
          </div>
          <div className='text-center'>
            {isLoading ? (
              <Loading message='Please wait while we verify !' />
            ) : (
              <button type='submit' className='btn btn-primary'>
                Signup
              </button>
            )}
          </div>
        </form>
        <div className='text-center mt-5'>
          Already have an account? then <Link to='/login'>Login</Link>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Signup;
