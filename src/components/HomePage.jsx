import React from "react";
import { Link } from "react-router-dom";

const HomePage = () => {
  const str = "{flag2_utfutfujygojn}";
  const code = "<n>_<text> ";
  return (
    <React.Fragment>
      <div
        className='container my-5 shadow py-3 rounded'
        style={{ maxWidth: "600px" }}>
        <h3 style={{ borderLeft: "3.5px solid red" }} className='pl-3'>
          EdiTH CTF
        </h3>
        <hr />
        <h5>Instructions</h5>
        <ul>
          <li>
            Please sign up before logging in. If you’re a team, sign up with
            only one set of credentials - a valid email id of either participant
            and the name of your team.
          </li>
          <li>
            Each flag will be of the form - edith <code>{str}</code>. The string
            inside the curly braces has to be submitted. The string will start
            with <code>flag-{code}</code> this means you have found the nth flag
            <b className='px-2'>e.g. flag2_utfutfujygojn</b> represents the
            second flag.
          </li>
          <li>
            You can submit each flag in the corresponding text box. Please
            remember that{" "}
            <i>you should submit each flag as soon as you find them</i>, and not
            all of them as a whole - this is because we note the timestamp for
            which each flag is found.
          </li>
          <li>
            Once the <span className='text-primary'>'Finish'</span> button is
            clicked, you cannot log back in. Do not click it before you are done
            with the whole event.
          </li>
        </ul>
        <hr />
        <div className='text-center d-flex align-item-center justify-content-between w-50 mx-auto'>
          <Link to='/signup'>Signup</Link>
          <Link to='/login'>Login</Link>
        </div>
      </div>
      <div
        className='container-fluid shadow mb-0 pb-0 border-bottom text-center'
        id='footer'>
        <p className='pt-4 text-muted'>
          © Crafted and Developed by WebOps Team 2020😎
        </p>
      </div>
    </React.Fragment>
  );
};

export default HomePage;
