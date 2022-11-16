import React, { useState, useEffect, useRef } from "react";
import "./register.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import { MDBSpinner } from "mdb-react-ui-kit";
import { toast } from "react-toastify";
import { register } from "../../redux/features/authSlice";
// import { GoogleLogin } from "react-google-login";

const initialState = {
  firstname: "",
  lastname: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Register = () => {
  const firstnameRef = useRef();

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [formValue, setFormValue] = useState(initialState);
  const [errMsg, setErrMsg] = useState("");
  const { loading, error } = useSelector((state) => ({ ...state.auth }));
  const { firstname, lastname, email, password, confirmPassword } = formValue;

  useEffect(() => {
    firstnameRef.current.focus();
  }, []);

  useEffect(() => {
    error && setErrMsg(error) && toast.error(error);
  }, [error]);

  const onInputChange = (e) => {
    setFormValue({ ...formValue, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.warning("password and confirmpassword is not the same");
    } else if (firstname && lastname && email && password && confirmPassword) {
      dispatch(register({ formValue, navigate, toast }));
    } else {
      setErrMsg("You should type your information");
      toast.warning("You should your type information");
    }
  };

  // const responseGoogle = (response) => {
  //   console.log(response);
  // };

  return (
    <div className="register">
      <div className="registerForm">
        <form onSubmit={handleSubmit} method="POST">
          <h3>REGISTER ACCOUNT</h3>
          <p> {errMsg} </p>
          {/* <span> {errMsg} </span> */}
          <label htmlFor="firstname">Firstname</label>
          <br></br>
          <input
            ref={firstnameRef}
            id="firstname"
            type="text"
            name="firstname"
            placeholder="type your firstname ..."
            value={firstname}
            onChange={onInputChange}
            // required
          />
          <br></br>
          <label htmlFor="lastname">Lastname</label>
          <br></br>
          <input
            id="lastname"
            type="text"
            name="lastname"
            placeholder="type your lastname ..."
            value={lastname}
            onChange={onInputChange}
            // required
          />
          <br></br>
          <label htmlFor="email">Email</label>
          <br></br>
          <input
            id="email"
            type="text"
            name="email"
            placeholder="type your email ..."
            value={email}
            onChange={onInputChange}
            // required
          />
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
          <label htmlFor="confirmPassword">Confirm Password</label>
          <br></br>
          <input
            id="confirmPassword"
            type="text"
            name="confirmPassword"
            placeholder="type your confirm password ..."
            value={confirmPassword}
            onChange={onInputChange}

            // required
          />
          <br></br>
          {/* <span>{errMsg}</span> */}
          <button>
            {loading && (
              <MDBSpinner size="sm" role="status" tag="span" className="me-2" />
            )}
            Register
          </button>
          {/* <GoogleLogin
            clientId="353063555502-vmlq568afuqq6adocqf262rbb5m2dr3n.apps.googleusercontent.com"
            buttonText="Login"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
          /> */}
          <br></br>
          <Link to="/login" className="linkButton">
            You have an account ? Signin
          </Link>
        </form>
      </div>
      {/* <ToastContainer /> */}
    </div>
  );
};

export default Register;
