import React from "react";

const HintModal = ({ hint, hintId, hintTitle }) => {
  //   console.log(`modal${hintId}`);
  return (
    <React.Fragment>
      <div className='modal fade' id={`modal${hintId}`}>
        <div className='modal-dialog modal-dialog-centered'>
          <div className='modal-content'>
            <div className='modal-header'>
              <h4 className='modal-title'>Hint !!</h4>
            </div>
            <div className='modal-body'>
              <h5>{hintTitle}</h5>
              <p>{hint}</p>
              <p className='text-danger'>
                <b>Note:</b> You have lost 5 points !!
              </p>
            </div>
            <div className='modal-footer'>
              <button
                type='button'
                className='btn btn-danger'
                data-dismiss='modal'>
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
};

export default HintModal;
