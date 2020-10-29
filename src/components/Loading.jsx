import React from "react";

const Loading = ({ message }) => {
  return (
    <React.Fragment>
      <div className='w-100 text-center'>
        <div className='spinner-grow text-primary mr-3'></div>
        <div className='spinner-grow text-danger'></div>
        <p>{message}</p>
      </div>
    </React.Fragment>
  );
};

export default Loading;
