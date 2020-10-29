import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HintModal from "./HintModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Form = () => {
  const [hints, setHints] = useState([]);
  const history = useHistory();
  const [submission, setSubmission] = useState([]);
  const [isHintOpen, setIsHintOpen] = useState([]);

  const URL = process.env.REACT_APP_HEROKU_LINK;
  const token = localStorage.getItem("Edith-token");
  const userId = localStorage.getItem("Edith-id");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    "auth-token": token,
  };

  const successNotify = (message) => {
    toast.success(message);
  };
  const failNotify = (message) => {
    toast.error(message);
  };

  useEffect(() => {
    axios
      .get(`${URL}api/hint/hints`)
      .then((response) => {
        // console.log(response.data);
        setHints(response.data);
      })
      .catch((error) => console.log(error));
  }, [URL]);

  useEffect(() => {
    if (!localStorage.getItem("Edith-token")) history.push("/");
  });

  const checkAnswers = (event, id, title) => {
    event.preventDefault();
    const ids = document.getElementById(`${id}-input`);
    // console.log(ids.value);

    if (ids.value === "") {
      failNotify("We don't want empty input fields");
      return;
    }

    let check = "";
    const result = hints.filter((hint) => hint._id === id);
    if (result[0].answer === ids.value) check = true;
    else check = false;
    axios({
      url: `${URL}api/auth/user/${userId}`,
      method: "get",
      headers: headers,
    })
      .then((response) => {
        setSubmission(response.data.submission);
        // setIsHintOpen(response.data.isHintOpen);
      })
      .catch((err) => {
        console.log(err);
      });

    const response = {
      submission: [
        ...submission,
        {
          id: id,
          hintTitle: title,
          answer: ids.value,
          timeStamp: Date.now(),
          isCorrect: check,
        },
      ],
    };

    axios({
      url: `${URL}api/auth/user/${userId}`,
      method: "put",
      data: response,
      headers: headers,
    })
      .then((response) => {
        // console.log(response);
        successNotify("Submitted Successfully !!");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const openHint = (event, id, title) => {
    event.preventDefault();
    axios({
      url: `${URL}api/auth/user/${userId}`,
      method: "get",
      headers: headers,
    })
      .then((response) => {
        setIsHintOpen(response.data.isHintOpen);
      })
      .catch((err) => {
        console.log(err);
      });
    // console.log("Hint Opened");
    // console.log("Hints", isHintOpen);
    const response = {
      isHintOpen: [
        ...isHintOpen,
        { id: id, hintTitle: title, timeStamp: Date.now() },
      ],
    };

    axios({
      url: `${URL}api/auth/user/${userId}`,
      method: "put",
      data: response,
      headers: headers,
    })
      .then((response) => {
        // console.log(response)
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <React.Fragment>
      <ToastContainer />
      <div
        className='container my-5 shadow py-3 rounded'
        style={{ maxWidth: "800px" }}>
        <h3 style={{ borderLeft: "3.5px solid red" }} className='pl-3'>
          Edith Questions
        </h3>
        <hr />
        {hints.map((hint) => (
          <React.Fragment key={hint._id}>
            <form className='mb-3'>
              <div className='row'>
                <div className='col-sm-8'>
                  <input
                    type='text'
                    id={`${hint._id}-input`}
                    className='form-control'
                    placeholder='Enter flag'
                    required
                  />
                </div>
                <div className='col-sm-4 text-right'>
                  <button
                    className='btn btn-primary'
                    type='submit'
                    onClick={(e) => checkAnswers(e, hint._id, hint.hintTitle)}>
                    Submit
                  </button>
                  <button
                    className='btn btn-outline-primary ml-2'
                    type='button'
                    data-toggle='modal'
                    data-target={`#modal${hint._id}`}
                    onClick={(e) => openHint(e, hint._id, hint.hintTitle)}>
                    Show Hint
                  </button>
                </div>
              </div>
            </form>
            <HintModal
              hintTitle={hint.hintTitle}
              hint={hint.hint}
              hintId={hint._id}
            />
          </React.Fragment>
        ))}
        <hr />
        <div className='text-center'>
          <button className='btn btn-primary' type='button'>
            Finish
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;

// <button
// className='btn btn-primary'
// type='submit'
// onClick={(e) => checkAnswers(e, hint._id)}>
// Submit
// </button>
// <p className='font-weight-light mt-1 text-primary'>
// Last Submitted: {hint.lastSubmitted}
// </p>
