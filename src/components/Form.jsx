import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HintModal from "./HintModal";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Loading from "./Loading";
import InstrcutionsModal from "./InstructionModal";

const Form = () => {
  const [hints, setHints] = useState([]);
  const history = useHistory();
  const [user, setUser] = useState([]);
  const [isLoading, setIsLoading] = useState(false);

  const URL = process.env.REACT_APP_HEROKU_LINK;
  const token = localStorage.getItem("Edith-token");
  const userId = localStorage.getItem("Edith-id");
  let submitted = JSON.parse(localStorage.getItem("Edith-buttonSubmitted"));

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

    toast.warning("Your submission is on its way 🚚💨 !!");

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
        successNotify("Submitted Successfully 🔥🔥 !!");
        if (!submitted.includes(id)) {
          submitted = [...submitted, id];
          localStorage.setItem(
            `Edith-buttonSubmitted`,
            JSON.stringify(submitted)
          );
        }
      })
      .catch((err) => {
        console.log(err);
        failNotify("Oops check you network connection 🥺🥺!");
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

  //CALCULATE RESULTS ON CLICKING FINISH BUTTON
  const calculateResults = (event) => {
    event.preventDefault();
    let point = 0;

    console.log();

    let value = hints.map((hint) => {
      if (!submitted.includes(hint._id)) {
        failNotify(
          `Please submit answer for Flag ${hint.hintTitle.split(" ")[1]} !!!`
        );
        return false;
      } else {
        return true;
      }
    });
    if (value.includes(false)) {
      return;
    }

    let hintsOpened = JSON.parse(localStorage.getItem("Edith-hintsOpened"));
    // eslint-disable-next-line array-callback-return
    hints.map((hint) => {
      if (hint.answer === document.getElementById(`${hint._id}-input`).value) {
        if (hintsOpened.includes(hint._id)) point = point + 0.5 * hint.points;
        else point = point + hint.points;
      }
    });

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
        className="container my-5 shadow py-3 rounded"
        style={{ maxWidth: "800px" }}
      >
        <h3 style={{ borderLeft: "3.5px solid red" }} className="pl-3">
          EdiTH sudoCTF
          <span
            data-toggle="modal"
            data-target={`#modalInstructions`}
            className="text-primary"
            style={{ fontSize: "1rem", cursor: "pointer" }}
          >
            (Instructions)
          </span>
        </h3>
        <InstrcutionsModal />
        <hr />

        {isLoading ? (
          <Loading message="Loading hints and flags" />
        ) : (
          hints.map((hint, index) => (
            <React.Fragment key={hint._id}>
              <form className="mb-3">
                <div className="row">
                  <div className="col-sm-8">
                    <input
                      type="text"
                      id={`${hint._id}-input`}
                      className="form-control"
                      placeholder={`Enter Flag ${index + 1}`}
                      required
                    />
                  </div>
                  <div className="col-sm-4 text-right">
                    <button
                      className="btn btn-primary"
                      type="submit"
                      id={`button-${hint._id}`}
                      onClick={(e) => checkAnswers(e, hint._id, hint.hintTitle)}
                    >
                      Submit
                    </button>
                    <button
                      className="btn btn-outline-primary ml-2"
                      type="button"
                      data-toggle="modal"
                      data-target={`#modal${hint._id}`}
                      onClick={(e) => openHint(e, hint._id, hint.hintTitle)}
                    >
                      Show Hint
                    </button>
                  </div>
                </div>
              </form>
              <p>
                Points: <b className="text-primary">{hint.points}</b>{" "}
              </p>
              {submitted.includes(hint._id) ? (
                <p className="text-success mt-0">Submitted</p>
              ) : (
                <p className="text-danger mt-0">Not Submitted</p>
              )}
              <HintModal
                hintTitle={hint.hintTitle}
                hint={hint.hint}
                hintId={hint._id}
              />
            </React.Fragment>
          ))
        )}
        <hr />
        <div className="text-center">
          <button
            className="btn btn-primary"
            type="button"
            onClick={(e) => calculateResults(e)}
          >
            Finish
          </button>
        </div>
      </div>
    </React.Fragment>
  );
};

export default Form;
