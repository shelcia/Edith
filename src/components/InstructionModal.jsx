import React from "react";
import Instrcutions from "./Instructions";

const InstructionModal = () => {
  return (
    <React.Fragment>
      <div className='modal fade' id='modalInstructions'>
        <div className='modal-dialog modal-dialog-centered modal-xl'>
          <div className='modal-content px-4'>
            <div className='modal-header'>
              <h4 className='modal-title'>Please Read Carefully !!</h4>
            </div>
            <Instrcutions />
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

export default InstructionModal;
