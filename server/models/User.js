const mongoose = require("mongoose")


const userSchema = mongoose.Schema({
    name: {
        type: String,
        require: [true, "Please provide username"]
    },

    email: {
        type: String,
        require: [true, "Please provide email"],
        unique: true,
        match: [
            /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
            "Please provide a valid email",
          ],
    },   

    password: {
        type: String,
        require: false
    },

    googleId: {
        type: String,
        required:false
    },

    id: {
        type: String
    }

})


module.exports = mongoose.model("User", userSchema)