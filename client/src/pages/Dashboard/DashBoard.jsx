import React, {useEffect, useState} from 'react'
import {useSelector, useDispatch} from "react-redux"
import {toast} from "react-toastify"
import { AiOutlineDelete, AiOutlineEdit} from 'react-icons/ai';
import "./dashboard.css"
import { deleteTour, getToursByUser } from '../../redux/features/tourSlice';
import { Link } from 'react-router-dom';
import Spinner from '../../components/Spinner/Spinner';
import ModalDelete from '../../components/ModalDelete/ModalDelete';

const DashBoard = () => {

    const [showModal, setShowModal] = useState(false)

  
    const {user} = useSelector((state) => ({...state.auth}))
    const userId = user?.result?._id
    // console.log(userId)
    const dispatch = useDispatch()
    const {userTours, loading} = useSelector((state)=> ({...state.tour}))
    // console.log(userTours)

    const excerpt = (str) => {
        if (str.length > 40) {
          str = str.substring(0, 40) + " ...";
        }
        return str;
      };

    useEffect(()=>{
        dispatch(getToursByUser(userId))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [userId])


    const handleDelete = (id) => {
        console.log(id)
        
        // if(window.confirm("ARE YOU SURE ABOUT DELETE TOUR")){
        //     dispatch(deleteTour({id, toast}))
        // }
    }

    

    const handleEdit = () => {

    }


    if(loading){
        return(
            user ? (

                
                <div className = "loadingSpinner" >
                        <Spinner/>  
        
                    </div>
                ) : (
                    <></>
                )
    )
                    
 }


    return (
    <div className = "dashboard" >
        {
            user ? (
                <div>

                {
                    userTours.length === 0 && (
                        <div className = "noDashboard" >
          

                    <h2 >NO TOURS AVAILABLE WITH THE USER: {(user?.result?.name).toUpperCase()} </h2>
                    
                    <Link to ="/addTour" className = "noLink" >ADD TOUR</Link>
                    
             
                </div>
            )
        }

        {

            userTours.length > 0 && (
                <div className='dashTitle' >
                DASHBOARD USERNAME: {(user.result.name).toUpperCase()}
                <div className = "dashLine" ></div>
                </div>

)
        }

        <div className='dashContain' >

            {
                userTours.map((item) => (
                    <>
                {
                    showModal ? (
                        <ModalDelete setShowModal = {setShowModal} toast = {toast}  />
                    ) : (
                        <></>
                    )
                }
                    <div key = {item._id}  className = "listItem" >
                        <div className='dashImage' >
                            <img src = {item.imageFile} alt = {item.title} />
                        </div>

                        <div className='dashInformation' >
                            <p className = "inforTitle" > {item.title} </p>
                            <p><small> {excerpt(item.description)} </small></p>
                        </div>
                        <div>
                            <AiOutlineDelete className='iconDelete' onClick = {() => handleDelete(item._id)} />
                            <Link to = {`/editTour/${item._id}`} >
                                <AiOutlineEdit className = "iconEdit" onClick = {handleEdit} />
                            
                            </Link>

                        </div>
                    </div>
            </>
                ))
            }
            

        </div>
        </div>
      
        ) : (
            <div></div>
        )
        }

    </div>
  )
}

export default DashBoard