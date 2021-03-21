import React from "react";
import Confetti from "react-confetti";
import { useHistory } from "react-router-dom";

const FinalPage = () => {
  const width = window.innerWidth;
  const height = window.innerHeight;
  const history = useHistory();

  const logout = (e) => {
    e.preventDefault();
    const PREFIX = "Edith-";
    localStorage.removeItem(`${PREFIX}token`);
    localStorage.removeItem(`${PREFIX}id`);
    localStorage.removeItem(`${PREFIX}point`);
    localStorage.removeItem(`${PREFIX}hintsOpened`);
    history.push("/");
  };

  return (
    <React.Fragment>
      <div className='w-100 h-100 d-flex justify-content-center'>
        <Confetti width={width} height={height} />
        <h3 style={{ marginTop: "50vh", transform: "translateY(-50%)" }}>
          Thanks For Participating.. We will reveal the results soon !!!
        </h3>
      </div>
      <div className='text-center'>
        <button className='btn btn-outline-danger' onClick={(e) => logout(e)}>
          Logout
        </button>
      </div>
    </React.Fragment>
  );
};

export default FinalPage;
