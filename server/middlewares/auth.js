const jwt = require("jsonwebtoken");
const User = require("../models/User");



const secret = "test"

const auth = async (req, res, next) =>{
    try {
        const token = req.headers.authorization.split(" ")[1]
        console.log("token: ", token)
        const isCustomAuth = token.length < 500;
        let decodedData
        if( token && isCustomAuth) {
            const decodedData = jwt.verify(token, secret)
            req.userId = decodedData?.id
            console.log("userId: ",req.userId)
        } else{
            decodedData = jwt.decode(token)
            console.log(decodedData)
            const googleId = decodedData?.sub.toString();   
            const user = await User.findOne({googleId})
            req.userId = user?._id
        }
        next()

    } catch (error) {
      console.log(error)
    }
}

module.exports = {auth}