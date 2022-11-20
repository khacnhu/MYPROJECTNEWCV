import React, { useState } from "react";
import "./changepassword.css";
import {toast} from "react-toastify"
import { changePassword } from "../../redux/features/authSlice";
import {useSelector, useDispatch } from "react-redux";
import {useNavigate, useParams } from "react-router-dom";


const initialState = {
  oldPassword: "",
  newPassword: "",
  confirmPassword: "",
};

const ChangePassword = () => {

  const {id} = useParams()
  console.log(id)
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [formValue, setFormValue] = useState(initialState);
  const { oldPassword, newPassword, confirmPassword } = formValue;

  const handleChangePass = (e) => {
    e.preventDefault()
    if(!oldPassword || !newPassword || !confirmPassword) {
      toast.warning("Bạn nên điền đầy đủ thông tin ")
    } else if (newPassword !== confirmPassword) {
      toast.warning("Mật khẩu mới và xác thực mật khẩu không giống nhau")
    } else if(!id) {
      toast.error("ID người dùng không tồn tại")
    } else {
      console.log(formValue, id)
      dispatch(changePassword({formValue, id, toast, navigate}))
      
    }
  };

  const onInputChange = (e) => {
    setFormValue({...formValue, [e.target.name]: e.target.value })
  }

  return (
    <div style={{ paddingTop: "100px" }}>
      <div className="formChange">
        <form onSubmit={handleChangePass} method = "POST" >
          <label htmlFor="oldPassword">OLD PASSWORD</label>
          <br></br>
          <input
            id="oldPassword"
            name="oldPassword"
            type="text"
            placeholder="type your oldpassword ..... "
            value = {oldPassword}
            onChange = {onInputChange}          
          />
          <br></br>
          <label htmlFor="newPassword">NEW PASSWORD</label>
          <br></br>
          <input
            id="newPassword"
            name="newPassword"
            type="text"
            placeholder="type your newpassword ..... "
            value = {newPassword}
            onChange={onInputChange}
          />
          <br></br>
          <label htmlFor="confirmPassword">CONFIRM PASSWORD</label>
          <br></br>
          <input
            id="confirmPassword"
            name="confirmPassword"
            type="text"
            placeholder="type your newpassword ....."
            value = {confirmPassword}
            onChange = {onInputChange}
            />

          <br></br>
          <div>
            <button>Submit</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ChangePassword;
