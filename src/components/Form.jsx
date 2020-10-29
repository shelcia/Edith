import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HintModal from "./HintModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";

const Form = () => {
  const [hints, setHints] = useState([]);
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

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
    const ac = new AbortController();
    axios({
      url: `${URL}api/auth/user/${userId}`,
      method: "get",
      headers: headers,
    })
      .then((response) => {
        setUser(response.data);
      })
      .catch((err) => {
        console.log(err);
      });
    return () => ac.abort(); // Abort both fetches on unmount
  }, [URL, headers, userId]);

  //GET HINTS
  useEffect(() => {
    const ac = new AbortController();
    setIsLoading(true);
    axios
      .get(`${URL}api/hint/hints`)
      .then((response) => {
        setHints(response.data);
        setIsLoading(false);
      })
      .catch((error) => console.log(error));
    return () => ac.abort(); // Abort both fetches on unmount
  }, [URL]);

  useEffect(() => {
    if (!localStorage.getItem("Edith-token")) history.push("/");
  }, [history]);

  //CHECK ANSWER ONCE USER CLICK SUBMIT
  const checkAnswers = (event, id, title) => {
    // console.log(user);
    event.preventDefault();
    const ids = document.getElementById(`${id}-input`);

    if (ids.value === "") {
      failNotify("We don't want empty input fields");
      return;
    }

    let check = "";
    const result = hints.filter((hint) => hint._id === id);
    if (result[0].answer === ids.value) check = true;
    else check = false;

    const response = {
      ...user,
      submission: user.submission.concat({
        id: id,
        hintTitle: title,
        answer: ids.value,
        timeStamp: Date.now(),
        isCorrect: check,
      }),
    };

    axios({
      url: `${URL}api/auth/user/${userId}`,
      method: "put",
      data: response,
      headers: headers,
    })
      .then((response) => {
        console.log("submitted succesfully");
        successNotify("Submitted Successfully !!");
      })
      .catch((err) => {
        console.log(err);
        failNotify("Oops check you network connection !");
      });
  };

  //EXECUTES WHEN HINT IS OPENED BY USER
  const openHint = (event, id, title) => {
    // console.log(user.isHintOpen);
    event.preventDefault();
    let hintsOpened = JSON.parse(localStorage.getItem("Edith-hintsOpened"));

    if (!hintsOpened.includes(id)) {
      hintsOpened = [...hintsOpened, id];
      localStorage.setItem(`Edith-hintsOpened`, JSON.stringify(hintsOpened));
    } else {
      return;
    }

    const updatedOpenHints = {
      ...user,
      isHintOpen: user.isHintOpen.concat({
        id: id,
        hintTitle: title,
        timeStamp: Date.now(),
      }),
    };

    axios({
      url: `${URL}api/auth/user/${userId}`,
      method: "put",
      data: updatedOpenHints,
      headers: headers,
    })
      .then((response) => {
        console.log("Hints recorded");
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const calculateResults = (event) => {
    event.preventDefault();
    let point = 0;

    // eslint-disable-next-line array-callback-return
    hints.map((hint) => {
      if (hint.answer === document.getElementById(`${hint._id}-input`).value) {
        point = point + 20;
      }
    });

    let hintsOpened = localStorage.getItem("Edith-hintsOpened");
    point = point - (JSON.parse(hintsOpened).length - 1) * 5;

    const response = {
      point: point,
    };
    axios({
      url: `${URL}api/auth/user/${userId}`,
      method: "put",
      data: response,
      headers: headers,
    })
      .then((response) => {
        console.log("response sent");
      })
      .catch((err) => {
        console.log(err);
      });
    history.push("/finalpage");
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

        {isLoading ? (
          <Loading message='Loading hints and flags' />
        ) : (
          hints.map((hint) => (
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
                      onClick={(e) =>
                        checkAnswers(e, hint._id, hint.hintTitle)
                      }>
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
          ))
        )}
        <hr />
        <div className='text-center'>
          <button
            className='btn btn-primary'
            type='button'
            onClick={(e) => calculateResults(e)}>
            Finish
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
