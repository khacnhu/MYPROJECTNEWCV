import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTours } from "../../redux/features/tourSlice";
import "./home.css";
import CardTour from "../../components/CardTour/CardTour";
import Pagination from "../../components/Pagination/Pagination";
import { setCurrentPage } from "../../redux/features/tourSlice";
import Banner from "../../components/Banner/Banner";
import { useLocation } from "react-router-dom";
import useQuery from "../../hook/useQuery";
import CountDown from "../../components/CountDown/CountDown";
import Slick from "../../components/Slick/Slick";

// function useQuery() {
//   return new URLSearchParams(useLocation().search)
// }

const Home = () => {

  const [timerDays, setTimerDay] = useState()
    const [timerHours, setTimerHour] = useState()
    const [timerMinutes, setTimerMinutes] = useState()
    const [timerSeconds, setTimerSeconds] = useState()


    let interval;
  
    const startTimer = () => {
      const timeCountdown = new Date("November 30, 2022").getTime()
  
      interval = setInterval(()=>{
        const now = new Date().getTime()
        
        const distance = timeCountdown - now
        // console.log(distance)
  
        const days = Math.floor(distance/(24*60*60*1000))
  
        const hours = Math.floor((distance%(24*60*60*1000))/(60*60*1000))
  
        const minutes = Math.floor((distance%(60*60*1000))/(60*1000))
         
        const seconds = Math.floor((distance%(60*1000))/1000)
        
        if (distance<0){
          
          clearInterval(interval)
        } else {
          setTimerDay(days)
          setTimerHour(hours)
          setTimerMinutes(minutes)
          setTimerSeconds(seconds)
          // console.log(days, hours, minutes)
        }
  
      }, 1000)
    }

    useEffect(()=>{
      startTimer()
    })


  const { tours, currentPage, numberOfPages } = useSelector(
    (state) => ({ ...state.tour })
  );
  const { user } = useSelector((state) => ({ ...state.auth }));

  const dispatch = useDispatch();

  const query = useQuery();
  const searchQuery = query.get("searchQuery");
  const location = useLocation();

  useEffect(() => {
    if (currentPage) {
      dispatch(getTours(currentPage));
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  // if(loading){
  //   return(
  //     <div style={{display:"flex", justifyContent: "center", alignItems: "center", height: "100vh"}} >
  //       <h1>Loading.......</h1>
  //     </div>
  //   )
  // }

  return (
    <div className="home">
      <Banner />
      <div className="mainSize">
        {tours.length === 0 && location.pathname === "/" && (
          <div>... NOT FOUND TOURS ...</div>
        )}


        {
          tours.length === 0 && location.pathname !== "/" && (
            <div className = "notFoundTour"> WE DON'T FIND MATCH FOR {searchQuery} TOUR WHICH YOU WANT ..............</div>
          )

        }

        {user ? (
          <div className="listTour">
            {tours &&
              tours.map((item, index) => <CardTour key={index} {...item} />)}
          </div>
        ) : (
          <div></div>
        )}
      </div>

      {user ? (
        <Pagination
          setCurrentPage={setCurrentPage}
          numberOfPages={numberOfPages}
          currentPage={currentPage}
          dispatch={dispatch}
        />
      ) : (
        <></>
      )}

      <CountDown timerDays = {timerDays} timerHours = {timerHours} timerMinutes = {timerMinutes} timerSeconds = {timerSeconds} />
      <Slick/> 
      </div>
  );
};

export default Home;
