import React, {useState, useEffect} from 'react'
import ChipInput from 'material-ui-chip-input'
import FileBase from "react-file-base64";
import "./addtour.css";
import {useDispatch, useSelector} from "react-redux";
import {useNavigate} from "react-router-dom"
import { toast } from "react-toastify";
import { createTour } from "../../redux/features/tourSlice";



const initialState = {
  title: "",
  description: "",
  tags: [],
}


const AddTour = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {user} = useSelector((state) => ({...state.auth}) )
  const {loading, error} = useSelector((state)=> ({...state.tour}))
  
  const [tagErrMsg, setTagErrMsg] = useState(null)
  const [tourData, setTourData] = useState(initialState)

  const { title, description, tags } = tourData;
  // console.log(tourData)

  useEffect(() => {
    error && toast.error(error)
    
  }, [error]);

  
  
  const onInputChange = (e) => {
    const { name, value } = e.target;
    setTourData({...tourData, [name]: value})
  }


  function handleAddTag(tag) {
    setTagErrMsg(null);
    setTourData({ ...tourData, tags: [...tourData.tags, tag] });
  }

  const handleDeleteTag = (deleteTag) => {
    setTourData({
      ...tourData,
      tags: tourData.tags.filter((tag) => tag !== deleteTag),
    });
  };
  
  const handleClear = () => {
    setTourData(initialState)
  }
  
  const handleSubmit = () => {
    if(!tags.length){
      setTagErrMsg("Please type your tags")
    }

    if(title.length && description.length && tags.length) {
      const UploadTourData = {...tourData, name: user?.result?.name}
      // console.log(UploadTourData)
      // console.log(JSON.parse(localStorage.getItem("profile")).accessToken)
      dispatch(createTour({UploadTourData, navigate, toast}))
    
    }
  }
  
  return (



    <div className = "addTour" >
      {
        user ? (
          
          <div className = "tourForm">
        {/* <form method='POST' > */}

        <h2>ADD TOUR</h2>
        <input 
          type = "text"
          placeholder='type your title'
          required
          value = {title}
          onChange = {onInputChange}
          name = "title"
          
          />
        <br></br>

        <textarea
          type = "text"
          placeholder='type your description'
          required
          value = {description}
          onChange = {onInputChange}
          name = "description"
          style={{height: "100px", width: "100%", marginTop: "24px"}}

          />
         <br></br>

         <ChipInput
        //  type = "text"
        variant= "outlined"
        name = "tags"
        placeholder='type your tags'
        fullWidth
        value={tags}
        onAdd = {(tag)=>handleAddTag(tag)}
        onDelete = {(tags)=> handleDeleteTag(tags)}
        style = {{marginTop: "24px"}}
          // onChange = {onInputChange}
          />

        {tagErrMsg && <div className='tagErrMsg' >{tagErrMsg}</div>}

         <br></br>

        <FileBase 
          type = "file"
          multiple = {false}
          onDone = {({base64})=> {
            setTourData({...tourData, imageFile: base64})
            
          }}
          
          
          />
        <br></br>
          <div className='allbutton' >

          <div className = "submitTour" >
            <button onClick={handleSubmit} >Submit</button>

          </div>
          <div className='clearTour' >
            <button onClick= {handleClear} >Clear</button>

          </div>
          </div>
          {/* </form> */}
        
          {/* <Chip label="Chip Filled" /> */}
        
      </div>
        ) : (
          <div></div>
        )
      }

    </div>
  )
}

export default AddTour