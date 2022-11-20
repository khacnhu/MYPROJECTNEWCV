import React, { useState } from "react";
import Link from "react-router-dom";
import "./updateuser.css";

const initialState = {
  lastname: "",
  firstname: "",
  email: "",
  gender: "",
  age: "",
  phone: "",
  imageFile : "",
};

const UpdateUser = () => {
  const [formUpdate, setFormUpdate] = useState(initialState);

  const { imageFile, firstname, lastname, email, gender, age, phone } = formUpdate;

  const onInputChange = (e) => {
    // setFormValue({ ...formValue, [e.target.name]: e.target.value });
    setFormUpdate({ ...formUpdate, [e.target.name]: e.target.value });
  };

  const handleUpdateUser = (e) => {
    e.preventDefault();
    console.log(formUpdate)
  };

  return (
    <div className="updateUser">
      <form onSubmit={handleUpdateUser}>
        <label htmlFor = "imageFile" >upload Avatar</label>
        <input
          type="file"
          placeholder="Upload your Avatar"
          onChange={onInputChange}
            name = "imageFile"
            value = {imageFile}
        />
        <br></br>

        <label htmlFor="firstname">First name</label>
        <input
          name="firstname"
          type="text"
          placeholder="Type your username .... "
          onChange={onInputChange}
          value = {firstname}
        />
        <br></br>

        <label htmlFor="lastname">Last name</label>
        <input
          name="lastname"
          type="text"
          placeholder="Type your lastname ..... "
          onChange={onInputChange}
          value = {lastname}
        />
        <br></br>

        <label htmlFor="email">Email</label>
        <input
          name="email"
          type="text"
          placeholder="Type your email ..... "
          onChange={onInputChange}
          value = {email}
        />
        <br></br>

        <label htmlFor="phone">Phone</label>
        <input
          name="phone"
          type="text"
          placeholder="Type your phone number ..... "
          onChange={onInputChange}
          value = {phone}
        />
        <br></br>

        <label htmlFor="gender">Gender</label>
        <input
          name="gender"
          type="text"
          placeholder="Type your gender ..... "
          onChange={onInputChange}
          value = {gender}
        />
        <br></br>

        <label htmlFor="age">Age</label>
        <input
          name="age"
          type="text"
          placeholder="Type your Age ..... "
          onChange={onInputChange}
          value = {age}
        />
        <br></br>

        <button>Update User</button>
      </form>

      <label>Password</label>
      <Link>Change Password</Link>
    </div>
  );
};

export default UpdateUser;
