const mongoose = require("mongoose")
const crypto = require("crypto");

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
        require:false
    },

    id: {
        type: String
    },
    gender: {
        type: String,
        require: false
    },

    age: {
        type: Number,
        require: false
    },

    phone: {
        type: Number,
        require:(false)
    },

    imageFile: {
        type: String,
        require: false
    },

    isAdmin: {
        type: Boolean,
        default: false
    },

    resetPasswordToken: String,
    resetPasswordExpire: Date,

})

userSchema.methods.getResetPasswordToken = function () {
    const resetToken = crypto.randomBytes(20).toString("hex");
  
    // Hash token (private key) and save to database
    this.resetPasswordToken = crypto.createHash("sha256").update(resetToken).digest("hex");
  
    // Set token expire date
    this.resetPasswordExpire = Date.now() + 20 * (60 * 1000); // twenty Minutes 
  
    return resetToken;
  };
  


module.exports = mongoose.model("User", userSchema)