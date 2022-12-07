import React from 'react'
import "./sidebar.css"
import {Link} from "react-router-dom"
import {useSelector, useDispatch} from "react-redux"
import { setLogout } from '../../redux/features/authSlice'

const Sidebar = () => {

  const {user} = useSelector((state)=> ({...state.auth}))
  // console.log(user.result._id)
  const dispatch = useDispatch()
  const btnLogout = () => {
    dispatch(setLogout())
  }

  return (
    <div className = "sidebar" >
      <div className = "sidebarContent" >
        <p>
          <Link to ="/updateuser" className = "sideLink" >UPDATE USER</Link>
        </p>
        <hr></hr>
        <p>
          <Link to = {`/changepassword/${user.result._id}`} className = "sideLink" >CHANGE PASSWORD</Link>

        </p>
        <hr></hr>

        <p>
          <Link to = "/"  className = "sideLink" >INFORMATION USER</Link>

        </p>
        <hr></hr>
        <p>
          <Link to = "/dashboard" className = "sideLink" >DASHBOARD</Link>

        </p>
        <hr></hr>
        <p>
          <Link to = "/" className = "sideLink" >HOME</Link>

        </p>
        <hr></hr>

        <p onClick={btnLogout} className = "sideLogout" >LOG OUT</p>
      </div>
    </div>
  )
}

export default Sidebar