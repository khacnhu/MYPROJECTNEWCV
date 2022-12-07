import React, {useState, useRef, useEffect} from "react";
import "./resetpassword.css";
import {useParams}  from "react-router-dom";
import { resetPassword } from "../../redux/features/authSlice";
import { useDispatch } from "react-redux";
import { useNavigate, Link } from "react-router-dom";
import { toast } from "react-toastify";

const initialState = {
  newPassword: "",
  confirmPasword: "",
};

const ResetPassword = () => {
  // console.log(useParams())
  const  {token} = useParams()
  console.log("Token: ",token)

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
      dispatch(resetPassword({formValue, token ,toast, navigate}))
      setFormValue(initialState);
    }
  };

  return (
    <div className="resetPassword">
      <div className = "resetForm" >

      <form onSubmit={submitReset} method="POST">
        <h5>RESET PASSWORD</h5>
        <label htmlFor="newPassword" className="labelReset" >New Password</label>
        <br></br>
        <input
          ref = {newPasswordRef}  
          value={newPassword}
          onChange={onInputChange}
          id="newPassword"
          name="newPassword"
          type="text"
          placeholder="type your password ... "
          className = "inputReset"
        />
        <br></br>
        <label htmlFor="confirmPassword" className="labelReset" >Confirm Passworrd</label>
        <br></br>
        <input
          value={confirmPassword}
          onChange={onInputChange}
          id="confirmPassword"
          name="confirmPassword"
          type="text"
          placeholder="type your confirm ... "
          className = "inputReset"
          />
        <br></br>
        <button type="submit" className = "btnReset" >ResetPassword</button>
        <br></br>
        <Link to = "/" >HOME</Link>
      </form>
      </div>
    </div>
  );
};

export default ResetPassword;
