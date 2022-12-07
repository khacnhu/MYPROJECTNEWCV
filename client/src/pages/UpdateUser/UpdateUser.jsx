import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
import "./updateuser.css";

const initialState = {
  lastname: "",
  firstname: "",
  email: "",
  gender: "",
  age: "",
  phone: "",
  address: "",
  // imageFile: "",
};

const UpdateUser = () => {

  const [file, setFile] = useState("")
  const [image, setImage] = useState("")

  const [formUpdate, setFormUpdate] = useState(initialState);

  const { firstname, lastname, email, gender, age, phone, address} =
    formUpdate;

  const onInputChange = (e) => {
    // setFormValue({ ...formValue, [e.target.name]: e.target.value });
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
  };

  const previewFile = (fileInput, ) => {
    const reader = new FileReader()
    reader.readAsDataURL(fileInput)
    reader.onloadend = () =>{
      setImage(reader.result)
      setFormUpdate({ ...formUpdate, imageFile: reader.result })
    }
  }
  
  console.log(image)
  const onInputChangeAvatar = (e) => {
    const fileInput = e.target.files[0]
    setFile(fileInput)
    previewFile(fileInput)

  }

  

  const handleUpdateUser = (e) => {
    e.preventDefault();
    console.log(formUpdate);
  };

  return (
    <div className="updateUser">
      <form onSubmit={handleUpdateUser}>
        <div className="updateForm">
          <div className = "updateAvatar" >
            {
              image === "" ? (
                <img src={"/images/userdefault.jpg"} alt="imageUserDefault" />

              ) : (
                <img src = {image}  alt = "avatarUserUpdate" className = "imageAvatar" />
              )
            }
            <br></br>
            <label htmlFor="imageFile">Update Avatar </label>
            {" "}
            <input
              type="file"
              id="imageFile"
              placeholder="Upload your Avatar"
              onChange={onInputChangeAvatar}
              name="imageFile"
              // value={imageFile}
            />
           
          </div>

          <div className="updateContent" >
            <button className = "updateBtn" >Update User</button>
            <br></br>
            <label htmlFor="firstname" className="labelUpdate" >First name</label>
            <br></br>
            <input
              className="updateInput"
              name="firstname"
              id="firstname"
              type="text"
              placeholder="Type your username .... "
              onChange={onInputChange}
              value={firstname}
            />
            <br></br>

            <label htmlFor="lastname" className = "labelUpdate" >Last name</label>
            <br></br>
            <input
              className="updateInput"
              name="lastname"
              id="lastname"
              type="text"
              placeholder="Type your lastname ..... "
              onChange={onInputChange}
              value={lastname}
            />
            <br></br>

            <label htmlFor="email" className = "labelUpdate" >Email</label>
            <br></br>
            <input
              className="updateInput"
              name="email"
              id="email"
              type="text"
              placeholder="Type your email ..... "
              onChange={onInputChange}
              value={email}
            />
            <br></br>

            <label htmlFor="phone" className = "labelUpdate" >Phone</label>
            <br></br>
            <input
              className="updateInput"
              name="phone"
              id="phone"
              type="text"
              placeholder="Type your phone number ..... "
              onChange={onInputChange}
              value={phone}
            />
            <br></br>

            <label htmlFor="gender" className = "labelUpdate" >Gender</label>
            <br></br>
            <input
              className = "updateInput"
              name="gender"
              id="gender"
              type="text"
              placeholder="Type your gender ..... "
              onChange={onInputChange}
              value={gender}
            />
            <br></br>

            <label htmlFor="age" className="labelUpdate" >Age:</label>
            <br></br>
            <input
              className="updateInput"
              name="age"
              id="age"
              type="text"
              placeholder="Type your Age ..... "
              onChange={onInputChange}
              value={age}
            />
            <br></br>
            <label htmlFor="address" className="labelUpdate" >Address:</label>
            <br></br>
            <input
              className="updateInput"
              name="address"
              id="address"
              type="text"
              placeholder="Type your Age ..... "
              onChange={onInputChange}
              value={address}
            />



          </div>
          {/* <Link to="/changepassword">Change Password</Link> */}
        </div>
      </form>
    </div>
  );
};

export default UpdateUser;
