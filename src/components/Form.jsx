import React, { useEffect, useState } from "react";
import axios from "axios";
import { useHistory } from "react-router-dom";
import HintModal from "./HintModal";
import useDynamicRefs from "use-dynamic-refs";

const Form = () => {
  const [hints, setHints] = useState([]);
  const history = useHistory();
  const [getRef, setRef] = useDynamicRefs();
  const [point, setPoint] = useState();

  const URL = process.env.REACT_APP_HEROKU_LINK;
  const token = localStorage.getItem("Edith-token");
  const userId = localStorage.getItem("Edith-id");

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const headers = {
    "auth-token": token,
  };

  const convertDate = (date) => {
    const dates = new Date(date);
    const formattedDate = Intl.DateTimeFormat("en-US", {
      year: "numeric",
      month: "short",
      day: "2-digit",
    }).format(dates);
    return formattedDate;
  };

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
    axios({
      url: `${URL}api/auth/getpoints/${userId}`,
      method: "get",
      headers: headers,
    })
      .then((response) => {
        // console.log(response.data.point);
        setPoint(response.data.point);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [URL, headers, userId]);
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

  const checkAnswers = (event, id) => {
    event.preventDefault();
    console.log(`${id}-input`);
    const ids = `${id}-input`;
    // let currentPoint;
    // const result = hints.filter((hint) => hint._id === id);
    const inputValue = getRef(ids);
    console.log(inputValue);

    // if (!typeof inputValue === null) {
    //   if (inputValue.current.value === result[0].answer)
    //     currentPoint = point + 20;
    //   else currentPoint = point;
    // }

    // console.log(userId);
    // const response = { point: currentPoint };

    // axios({
    //   url: `${URL}api/auth/editpoints/${userId}`,
    //   method: "put",
    //   data: response,
    //   headers: headers,
    // })
    //   .then((response) => {
    //     console.log(response);
    //     //   setIsLoading(false);
    //   })
    //   .catch((err) => {
    //     //   setIsLoading(false);
    //     console.log(err);
    //   });
  };

  return (
    <React.Fragment>
      <div
        className='container my-5 shadow py-3 rounded'
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
                    ref={setRef(`${hint._id}-input`)}
                    type='text'
                    id={`${hint._id}-input`}
                    className='form-control'
                    placeholder='Enter flag'
                  />
                </div>
                <div className='col text-right'>
                  <button
                    className='btn btn-primary'
                    type='submit'
                    onClick={(e) => checkAnswers(e, hint._id)}>
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
