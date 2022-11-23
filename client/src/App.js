import React, {useEffect} from "react"
import "./App.css";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Header from "./components/Header/Header";
import Footer from  "./components/Footer/Footer";

import Home from "./pages/Home/Home";
import Login from "./pages/Login/Login";
import Register from "./pages/Register/Register";
import ChangePassword from "./pages/ChangePassword/ChangePassword";
import VerifyEmail from "./pages/VerifyEmail/VerifyEmail";
import ResetPassword from "./pages/ResetPassword/ResetPassword";

import {ToastContainer} from "react-toastify"
import 'react-toastify/dist/ReactToastify.css';

import {setUser} from "./redux/features/authSlice"
import { useDispatch, useSelector } from "react-redux";

import AddTour from "./pages/AddTour/AddTour";
import SingleTour from "./pages/SingleTour/SingleTour";
import DashBoard from "./pages/Dashboard/DashBoard";
import EditTour from "./pages/EditTour/EditTour";
import NotFound from "./pages/NotFound/NotFound";
import TagTours from "./pages/TagTours/TagTours";


function App() {

  const dispatch = useDispatch()

  const user = JSON.parse(localStorage.getItem("profile"))

  const {darkMode} = useSelector((state)=>({...state.theme}))
  localStorage.setItem("darkMode", darkMode)


  useEffect(() => {
    dispatch(setUser(user))
      // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])


  return (
    <>
      <BrowserRouter>
        <div className= {darkMode === "light" ? "App" : "AppTheme"} >
          <Header/>
          {/* <Banner/> */}
          <Routes>
              <Route path = "/" element = {<Home/>} />
              <Route path = "/login" element={<Login/>} />
              <Route path = "/register" element={<Register/>} />
              <Route path = "/changepassword/:id"  element={<ChangePassword/>} />
              <Route path = "/verifyEmail" element = {<VerifyEmail/>} />
              <Route path = "/passwordreset/reset/:token" element = {<ResetPassword/>} />


              <Route path = "/tours/search" element={<Home/>} />
              <Route path = "/tours/tag/:tag" element = {<TagTours/>} />
              <Route path = "/addTour" element= {<AddTour/>} />
              <Route path = "/editTour/:id" element = {<EditTour/>} />
              <Route path = "/tour/:id" element = {<SingleTour/>}/>
              <Route path = "/dashboard" element={<DashBoard/>} />
              
              <Route path = "*" element = {<NotFound/>} />
              

          </Routes>  

          <Footer/>
          
        
        </div>
    
          <ToastContainer/>
      </BrowserRouter>
    
    </>
  );
}

export default App;
