import React from "react";
import "./modaldelete.css";
import { useDispatch } from "react-redux";
// import { deleteTour } from '../../redux/api'
import { deleteTour } from "../../redux/features/tourSlice";

const ModalDelete = (props) => {
  const { id, toast, setShowModal } = props;

  const dispatch = useDispatch();

  const handleCancel = () => {
    setShowModal(false);
  };

  const handleDelete = (id) => {
    dispatch(deleteTour({ id, toast }));
    // toast.success("DELETE SUCCESSULLY")
    setShowModal(false);
  };

  return (
    <div className="modalDelete">
      <div className="modalContent">
        <button className="btnClose" onClick={() => handleCancel()}>
          X
        </button>
        <h4 className="btnInformation">ARE YOU SURE DELETE YOUR TOUR</h4>
        <div className = "modalBtn" >
          <button className="btnDelete" onClick={() => handleDelete(id)}>
            Yes
          </button>
          <button className="btnCancel" onClick={() => handleCancel()}>
            Cancel
          </button>
        </div>
      </div>

     
    </div>
  );
};

export default ModalDelete;
