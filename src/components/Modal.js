import React from "react";
import { useDispatch } from "react-redux";
import { closeDeleteModal, deleteJob } from "../slice/jobSlice";

const Modal = () => {
  const dispatch = useDispatch();

  return (
    <aside className="modal-container">
      <div className="modal">
        <h4>Do you want to delete tha Job?</h4>

        <div className="btn-container">
          <button
            type="button"
            className="btn clear-btn"
            onClick={() => {
     
              dispatch(deleteJob());
            }}
          >
            Confirm
          </button>
          <button
            type="button"
            className="btn confirm-btn"
            onClick={() => {
              dispatch(closeDeleteModal());
            }}
          >
            Cancel
          </button>
        </div>
      </div>
    </aside>
  );
};

export default Modal;
