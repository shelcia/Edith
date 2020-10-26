import React, { useRef } from "react";
import { Link } from "react-router-dom";

const Signup = () => {
  const name = useRef(null);

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
        <h3 className='text-center'>Signup</h3>
        <form className='was-validated' onSubmit={onSubmit}>
          <div className='form-group'>
            <label htmlFor='uname'>Name:</label>
            <input
              type='text'
              ref={name}
              className='form-control'
              placeholder='Enter email'
              required
            />
            <div className='invalid-feedback'>Please fill out this field.</div>
          </div>
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
            <button type='submit' className='btn btn-primary'>
              Submit
            </button>
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
