const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")

const secret = "test"


const signup = async (req, res) => {
    const {firstname, lastname, email, password} = req.body;

    try {
        const oldUser = await User.findOne({email})
        if (oldUser) {
            return res.status(400).json({message: "User already exist"})
        }

        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(password, salt)

        const result = await User.create({
            email, 
            password: hashedPassword,
            name: `${firstname} ${lastname}`
        })

        const accesToken = jwt.sign({email: result.email, id: result._id}, secret, {expiresIn: "1h"})
        res.status(201).json({result, accesToken})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went wrong"})
    }

}



const signin = async (req, res) => {
    const {email, password} = req.body

    try {
        const oldUser = await User.findOne({email})

        if(!oldUser) {
            return res.status(404).json({message: "User is not existed"})
        } 


        const isCheckPassword = await bcrypt.compare(password, oldUser.password)
    
        if(!isCheckPassword) {
            return res.status(400).json({message: "PASSWORD IS NOT CORRECT"})
        }

        const accessToken = jwt.sign({email: oldUser.email, id: oldUser._id}, secret, {expiresIn: "1h"})
        
        return res.status(200).json({result: oldUser, accessToken})

    } catch (error) {
        console.log(error)
        return res.status(500).json({message: "Something went wrong"})
    }


}


const googleSignIn = async(req, res) => {
    const { email, name, token, googleId } = req.body;

    try {
      const oldUser = await User.findOne({ email });
      if (oldUser) {
        const result = { _id: oldUser._id.toString(), email, name };
        return res.status(200).json({ result, accessToken: token });
      }
  
      const result = await User.create({
        email,
        name,
        googleId,
      });
  
      res.status(200).json({ result, accessToken: token });
    } catch (error) {
      res.status(500).json({ message: "Something went wrong" });
      console.log(error);
    }
}



module.exports = {
    signup,
    signin,
    googleSignIn
}