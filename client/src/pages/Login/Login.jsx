import React, { useState, useRef, useEffect } from "react";
import "./login.css";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";
import { login, googleSignIn } from "../../redux/features/authSlice";
import { MDBSpinner} from "mdb-react-ui-kit";
import { GoogleLogin } from "react-google-login";
import { gapi } from 'gapi-script';

const initialState = {
  email: "",
  password: "",
};

const Login = () => {
  const emailRef = useRef();

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [formValue, setFormValue] = useState(initialState);
  const { email, password } = formValue;
  const [errMsg, setErrMsg] = useState("");
  const { loading, error } = useSelector((state) => ({ ...state.auth }));

  useEffect(() => {
    error && setErrMsg(error) && toast.error(error);
  }, [error]);

  const toastOptions = {
    position: "bottom-right",
    autoClose: 2000,
    pauseOnHover: true,
    draggable: true,
    // theme: "green",
  };

  useEffect(() => {
    emailRef.current.focus();
  }, []);

  // console.log(formValue)

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!email || !password) {
      setErrMsg("type your username and password");
      toast.error("You should type your email or password", toastOptions);
      setFormValue(initialState);
    } else {
      dispatch(login({ formValue, navigate, toast }));
    }
  };

  const onInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };
  
  // const clientId = "353063555502-e0378d69r03a19mffbl7ao9veq63dmld.apps.googleusercontent.com"

  useEffect(() => {
    const initClient = () => {
          gapi.client.init({
          clientId: "353063555502-e0378d69r03a19mffbl7ao9veq63dmld.apps.googleusercontent.com",
          scope: ''
        });
     };
     gapi.load('client:auth2', initClient);
 });

  const googleSuccess = (response) => {
    // console.log(response.tokenId)
    // console.log(response.profileObj)
    
    // dấu chấm hỏi ? ở dưới có nghãi là (response && response.profileObj && response.profileObj.email)

    const email = response?.profileObj?.email
    const name = response?.profileObj?.name
    const token = response?.tokenId
    const googleId = response.googleId
    const result = {email, name, token, googleId}
    console.log(result)
    dispatch(googleSignIn({result, navigate, toast}))  
  };

  const googleFailure = (error) => {
    toast.error("LOGIN GOOGLE FAILURE")
  };

  

  return (
    <div className="login">
      <div className="loginForm">
        <form onSubmit={handleSubmit} method="POST">
          <h1>LOGIN ACCOUNT</h1>
          <p> {errMsg} </p>
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            ref={emailRef}
            id="email"
            type="text"
            name="email"
            placeholder="type your email ..."
            value={email}
            onChange={onInputChange}
            // required
          />

          {/* <span> {errMsg} </span> */}
          <br></br>
          <label htmlFor="password">Password</label>
          <br></br>
          <input
            id="password"
            type="text"
            name="password"
            placeholder="type your password ..."
            value={password}
            onChange={onInputChange}

            // required
          />
          <br></br>
          {/* <span>{errMsg}</span> */}
          {/* 353063555502-e0378d69r03a19mffbl7ao9veq63dmld.apps.googleusercontent.com */}
          <button>Login</button>
          <GoogleLogin
          clientId = "353063555502-e0378d69r03a19mffbl7ao9veq63dmld.apps.googleusercontent.com"
          buttonText="Sign in with Google"
          onSuccess={googleSuccess}
          onFailure={googleFailure}
          cookiePolicy={'single_host_origin'}
          // isSignedIn={true}
      />
        
          <br></br>

          <div>
            {loading && (
              <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            )}
            <Link to="/register">Don't have account ? Signup</Link>
          </div>
        </form>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Login;
