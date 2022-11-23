import React, { useState, useEffect, useRef } from " react";
import "./resetpassword.css";
import useParams from "react-router-dom";
import { resetPassword } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  newPassword: "",
  confirmPasword: "",
};

const ResetPassword = () => {
  const { resetToken } = useParams();
  console.log("ResetToken: ", resetToken);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const newPasswordRef = useRef();

  useEffect(() => {
    newPasswordRef.current.focus();
  }, []);

  const [formValue, setFormValue] = useState(initialState);

  const { newPassword, confirmPassword } = formValue;

  const onInputChange = (e) => {
    setFormValue((state) => ({ ...state, [e.target.name]: e.target.value }));
  };

  const submitReset = (e) => {
    e.preventDefault();
    if (!newPassword || !confirmPassword) {
      toast.error("Bạn nên nhập đầy đủ thông tin bên dưới");
    } else if (newPassword !== confirmPassword) {
      toast.error("confirmPassword không đúng vs newPassword");
    } else {
      console.log(formValue);
      // dispatch(resetPassword({formValue, resetToken,toast, navigate}))

      setFormValue(initialState);
    }
  };

  return (
    <div className="resetPassword">
      <form onSubmit={submitReset} method="POST">
        <label htmlFor="newPassword">New Password</label>
        <br></br>
        <input
          ref = {newPasswordRef}  
          value={newPassword}
          onChange={onInputChange}
          id="newPassword"
          name="newPassword"
          type="text"
          placeholder="type your password ... "
        />
        <br></br>
        <label htmlFor="confirmPassword">Confirm Passworrd</label>
        <br></br>
        <input
          value={confirmPassword}
          onChange={onInputChange}
          id="confirmPassword"
          name="confirmPassword"
          type="text"
          placeholder="type your confirmpassword ... "
        />
        <br></br>
        <button type="submit">ResetPassword</button>
      </form>
    </div>
  );
};

export default ResetPassword;
