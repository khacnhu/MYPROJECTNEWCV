import React, {useState, useRef, useEffect} from "react";
import "./verifyemail.css";
import { forgotPassword } from "../../redux/features/authSlice";
import {useDispatch} from "react-redux";
import {useNavigate} from  "react-router-dom"
import { toast } from "react-toastify";

const initialState = {
    email: "",
}


const VerifyEmail = () => {

    const dispatch = useDispatch()
    const navigate = useNavigate()

    const emailRef = useRef()

    useEffect(() => {
        emailRef.current.focus();
      }, []);

    const [formValue, setFormValue] = useState(initialState)

    const {email} = formValue

    const onInputChange = (e) => {
        setFormValue(state=>({...state, [e.target.name]: e.target.value}))
    }

    const submitEmail = (e) => {
      e.preventDefault()
      if(!email){
        toast.error("Bạn nên điền email vào ô trống")
      } else{
        console.log(formValue)
        dispatch(forgotPassword({formValue, toast, navigate}))
        setFormValue(initialState)
      }
    }


  return (
    <div className="verifyEmail">
      <form onSubmit = {submitEmail} method = "POST" >
        <label htmlFor = "email" >EMAIL</label>
        <br></br>
        <input ref = {emailRef} id = "email" name = "email" value = {email} type="text" placeholder="type your email ... " onChange = {onInputChange} />
        <br></br>
        <button type = "submit" >Verify Email</button>
      </form>
    </div>
  );
};
export default VerifyEmail;
