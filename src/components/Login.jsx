import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Login = () => {
  const user = useRef(null);
  const password = useRef(null);

  const onSubmit = (event) => {
    event.preventDefault();
  };

  return (
    <React.Fragment>
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
              id='uname'
              placeholder='Enter email'
              name='uname'
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
              id='pwd'
              placeholder='Enter password'
              name='pswd'
              required
            />
            <div className='invalid-feedback'>Please fill out this field.</div>
          </div>
          <div className='text-center'>
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
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
