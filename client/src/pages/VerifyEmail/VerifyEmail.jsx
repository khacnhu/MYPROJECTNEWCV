import React, {useState, useRef, useEffect} from "react";
import "./verifyemail.css";
import { forgotPassword } from "../../redux/features/authSlice";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from  "react-router-dom"
import { toast } from "react-toastify";
import { MDBSpinner} from "mdb-react-ui-kit";

const initialState = {
    email: "",
}


const VerifyEmail = () => {
  const { loading } = useSelector((state) => ({ ...state.auth }));

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
      <div className = "emailForm" > 

      <form onSubmit = {submitEmail} method = "POST" >
        <label htmlFor = "email" className="emailVeri" >VERIFY EMAIL</label>
        <br></br>
        <input className="inputEmail" ref = {emailRef} id = "email" name = "email" value = {email} type="text" placeholder="type your email ... " onChange = {onInputChange} />
        <br></br>
        <button type = "submit" className="btnEmail" >Verify Email</button>
        <br></br>
        {loading && (
              <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            )}
      </form>
      </div>
    </div>
  );
};
export default VerifyEmail;
