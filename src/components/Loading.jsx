import React from "react";

const Loading = ({ message }) => {
  return (
    <React.Fragment>
      <div className='spinner-grow text-warning mr-3'></div>
      <div className='spinner-grow text-danger'></div>
      <p>{message}</p>
    </React.Fragment>
  );
};

export default Loading;
