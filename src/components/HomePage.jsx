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
        <h5>
          Instructions{" "}
          <span className='text-danger' style={{ fontSize: "0.8rem" }}>
            Please read it carefully 🚨🚨!!
          </span>
        </h5>
        <ul>
          <li>
            Please <span className='text-primary'>sign up</span> before logging
            in. If you’re a team, sign up with only one set of credentials - a
            valid email id of either participant and the name of your team.
          </li>
          <li>
            Each flag will be of the form - <code>edith{str}</code>.{" "}
            <mark>
              <b>The string inside the curly braces has to be submitted!!!.</b>
            </mark>{" "}
            The string will start with <code>flag-{code}</code> this means you
            have found the nth flag
            <b className='px-2'>e.g. flag2_utfutfujygojn</b> represents the
            second flag.
          </li>
          <li>
            You can submit each flag in the corresponding text box. Please
            remember that{" "}
            <b>you should submit each flag as soon as you find them</b>, and not
            all of them as a whole - this is because we note the{" "}
            <span className='text-primary'>timestamp</span> for which each flag
            is found.
          </li>
          <li>
            <b>
              Once the <span className='text-primary'>'Finish'</span> button is
              clicked, you cannot log back in.
            </b>{" "}
            Do not click it before you are done with the whole event.
          </li>
        </ul>
        <h5 className='mt-5 mb-4'>Marking scheme</h5>
        <table
          className='table table-hover mx-auto'
          style={{ width: "90%", marginBottom: "1.5rem" }}>
          <tbody>
            <tr>
              <td>Correct answer without hint</td>
              <th>10 points</th>
            </tr>
            <tr>
              <td>Correct answer with hint</td>
              <th>5 points</th>
            </tr>
            <tr>
              <td>Incorrect answer with hint </td>
              <th>0 points</th>
            </tr>
            <tr>
              <td>Incorrect answer without hint</td>
              <th>0 points</th>
            </tr>
          </tbody>
        </table>
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
