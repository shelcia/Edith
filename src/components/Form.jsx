import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HintModal from "./HintModal";

const Form = () => {
  const [hints, setHints] = useState([]);
  const history = useHistory();

  const URL = process.env.REACT_APP_HEROKU_LINK;

  useEffect(() => {
    axios
      .get(`${URL}api/hint/hints`)
      .then((response) => {
        console.log(response.data);
        setHints(response.data);
      })
      .catch((error) => console.log(error));
  }, [URL]);

  useEffect(() => {
    if (!localStorage.getItem("Edith-token")) history.push("/");
  });

  const logout = (e) => {
    e.preventDefault();
    const PREFIX = "Edith-";
    localStorage.removeItem(`${PREFIX}token`);
    localStorage.removeItem(`${PREFIX}id`);
    history.push("/");
  };

  return (
    <React.Fragment>
      <div
        className='container mt-5 shadow py-3 rounded'
        style={{ maxWidth: "800px" }}>
        <h3 style={{ borderLeft: "3.5px solid red" }} className='pl-3'>
          Edith Questions
        </h3>
        <hr />
        {hints.map((hint) => (
          <React.Fragment key={hint._id}>
            <form className='mb-2'>
              <div className='row'>
                <div className='col'>
                  <input
                    type='text'
                    className='form-control'
                    placeholder='Enter flag'
                  />
                </div>
                <div className='col text-right'>
                  <button className='btn btn-primary' type='submit'>
                    Submit
                  </button>
                  <button
                    className='btn btn-outline-primary ml-2'
                    type='button'
                    data-toggle='modal'
                    data-target={`#modal${hint._id}`}>
                    Show Hint
                  </button>
                </div>
              </div>
              <p className='font-weight-light mt-1 text-primary'>
                Last Submitted: {hint.lastSubmitted}
              </p>
            </form>
            <HintModal hint={hint.hint} hintId={hint._id} />
          </React.Fragment>
        ))}
        <hr />
        <div className='text-center'>
          <button className='btn btn-primary' type='button'>
            Finish
          </button>
          <button
            className='btn btn-danger ml-2'
            type='button'
            onClick={(e) => logout(e)}>
            Logout
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
