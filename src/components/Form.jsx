import React from "react";

const Form = () => {
  return (
    <React.Fragment>
      <div
        className='container mt-5 shadow py-3 rounded'
        style={{ maxWidth: "800px" }}>
        <form>
          <div className='row'>
            <div className='col'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter flag'
              />
            </div>
            <div class='col'>
              <input
                type='text'
                className='form-control'
                placeholder='Enter flag'
              />
            </div>
          </div>
        </form>
      </div>
    </React.Fragment>
  );
};

export default Form;
