import React from 'react'
import "./sidebar.css"
import {Link} from "react-router-dom"
import {useSelector} from "react-redux"


const Sidebar = () => {

  const {user} = useSelector((state)=> ({...state.auth}))
  console.log(user.result._id)


  return (
    <div className = "sidebar" >
      <div className = "sidebarContent" >
        <p>UPDATE USER</p>
        <hr></hr>
        <Link to = {`/changepassword/${user.result._id}`} >CHANGE PASSWORD</Link>
        <hr></hr>
        <p>INFORMATION USER</p>
        <hr></hr>
        <p>DASHBOARD</p>
        <hr></hr>
        <p>HOME</p>
        <hr></hr>
        <p>LOG OUT</p>
      </div>
    </div>
  )
}

export default Sidebar