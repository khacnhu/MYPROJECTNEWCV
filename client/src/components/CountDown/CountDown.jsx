import React from "react";
import "./countdown.css"
import { useNavigate } from "react-router-dom";
import useSelector from "react-redux"


const CountDown = ({
  timerDays,
  timerHours,
  timerMinutes,
  timerSeconds,
}) => {

  const { user } = useSelector((state) => ({ ...state.auth }))

    const navigate = useNavigate()

    const changeLink = () => {
        navigate("/register")
    }
  return (
    <div className = "CountDown" >
        <h1 className = "clockHeader" >Đếm ngược sự kiện</h1>
        <h5>Ngày lễ hội tiếp theo sắp đến mau mau đăng ký nào</h5>
      <div className="clockContainer">
        <section className="timerContainer">
          {/* <h1>Punch App</h1> */}
          <section className="timer">
            <div className="clock">
              <section>
                {timerDays < 10 ? <p> 0{timerDays} </p> : <p> {timerDays} </p>}
                {/* <p> {timerDays} </p> */}
                <small>Days</small>
              </section>
              <span>:</span>
              <section>
                {timerHours < 10 ? (
                  <p> 0{timerHours} </p>
                ) : (
                  <p> {timerHours} </p>
                )}

                <small>Hours</small>
              </section>
              <span>:</span>
              <section>
                {timerMinutes < 10 ? (
                  <p> 0{timerMinutes} </p>
                ) : (
                  <p> {timerMinutes} </p>
                )}
                <small>Minutes</small>
              </section>
              <span>:</span>
              <section>
                {timerSeconds < 10 ? (
                  <p> 0{timerSeconds} </p>
                ) : (
                  <p> {timerSeconds} </p>
                )}
                <small>Seconds</small>
              </section>
            </div>
          </section>
        </section>
      </div>
      {
        user ? (<p className = "footerCountdown">WELCOME TO MY FAMILY</p>) : (
          <button className="clockButton" onClick={changeLink} >REGISTER ACCOUNT</button>
        )
      }
    </div>
  );
};


export default CountDown