import React from "react";
import "./modaldelete.css";
import { useDispatch } from "react-redux";
// import { deleteTour } from '../../redux/api'
import { deleteTour } from "../../redux/features/tourSlice";
import {toast} from "react-toastify"

const ModalDelete = (props) => {
  const { visible, selected, onCloseModal, onOkModal } = props;

  const dispatch = useDispatch();

  const handleCancel = () => {
    onCloseModal && onCloseModal()
    // setShowModal(false);
  };

  const handleDelete = () => {
    onOkModal && onOkModal()
    dispatch(deleteTour({ selected, toast }));
    toast.success("DELETE SUCCESSULLY")
    // setShowModal(false);
  };

  return (
    
    <>
    {
      visible && ( 
        <div className="modalDelete">
      <div className="modalContent">
        <button className="btnClose" onClick={() => handleCancel()}>
          X
        </button>
        <h4 className="btnInformation">ARE YOU SURE DELETE YOUR TOUR</h4>
        <div className = "modalBtn" >
          <button className="btnDelete" onClick={() => handleDelete()}>
            Yes
          </button>
          <button className="btnCancel" onClick={() => handleCancel()}>
            Cancel
          </button>
        </div>
      </div>

     
    </div>
    
  ) 
}
    </>
  );
};
export default ModalDelete;

