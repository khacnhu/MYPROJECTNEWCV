const bcrypt = require("bcryptjs")
const jwt = require("jsonwebtoken")
const User = require("../models/User")
const SendMail = require("../utils/sendEMail.js")
const crypto = require("crypto");

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

const changePassword = async (req, res) => {
    const id = req.params.id
    console.log("ID: ", id)
    const {oldPassword, newPassword} = req.body
    console.log(oldPassword, newPassword)
    try {
        console.log("da vao dc try")

    

        const oldUser = await User.findById({_id: id})
        console.log("OLDUSER Password: ", oldUser.password)
        if(!oldUser) {
            return res.status(404).json({message: "User không tồn tại trong dữ liệu"})
        }

        const isCheckPassword = await bcrypt.compare(oldPassword, oldUser.password)
        console.log(isCheckPassword)

        if(!isCheckPassword) {
            return res.status(401).json({message: "Mật khẩu cũ bạn nhập không đúng"})
        }
        const salt = await bcrypt.genSalt(12)
        const hashedPassword = await bcrypt.hash(newPassword, salt)
        oldUser.password = hashedPassword
        await oldUser.save()
        // return res.status(200).json("thanh cong")
        return res.status(200).json({message: "Bạn đã đổi mật khẩu thành công", result: oldUser})
    } catch (error) {
        return res.status(500).json({message: "Server bị lỗi mong bạn kiểm tra lại"})
    }
}


const forgotpassword = async (req, res, next) => {
    const email = req.body.email
    try {
        
        const user = await User.findOne({email})
        if(!user){
            res.status(404).send({statue: false, message: "EMAIL CỦA BẠN KHÔNG ĐÚNG"})
        }

        const resetToken = user.getResetPasswordToken()
        console.log(resetToken)
        
        await user.save()

        const resetPasswordUrl = `http://localhost:3000/passwordresset/:${resetToken}`

        const messageText = `
            <h1>ĐÂY LÀ ĐƯỜNG DẪN ĐỂ BẠN RESET PASSWORD</h1>
            <p>XIN HÃY NHẤN VÀO ĐƯỜNG DẪN DƯỚI ĐÂY</p>
            <a href = ${resetPasswordUrl} clicktracking = off >${resetPasswordUrl}</a>
        `
        try {
            await SendMail({
                subject: "REQUETS YÊU CẦU THAY ĐỔI PASSWORD",
                // subject: "REQUETS YÊU CẦU THAY ĐỔI PASSWORD",
                text: messageText
            })

            res.status(200).send({statue: true, data: "Email đã được gửi đi", result: user})
        } catch (error) {
            user.resetPasswordToken = undefined;
            user.resetPasswordExpire = undefined;
      
            await user.save();
      
            //cái chỗ error này nên xem lại
            return next(error);
        }

    } catch (error) {
        next(error)
    }
}


const resetpassword = async (req, res, next) => {
    const resetToken = req.params.resetToken
    const resetPasswordToken = crypto.createHashh("sha26").update(resetToken).diget("hex");
    
    try {
        
        const user = await User.findOne({
            resetPasswordToken,
            resetPasswrordExpire: { $gt: Date.now()  }
        })
        
        if (!user){
            return res.status(400).json("CO THE CAI REFRESH TOKEN BAN GUI LEN KHONG DUNG HOAC LA BAN KHONG CO QUYEN TRUY CAP VI USER KO CO")

        }

        user.password = req.body.password;
        user.resetPasswordToken = undefined;
        user.resetPasswordExpire = undefined;

        await user.save()

        res.status(200).send({status: true, message: "Password cua ban da duoc thay doi"})

    } catch (error) {
        next(error)
    }

}

module.exports = {
    signup,
    signin,
    googleSignIn,
    changePassword ,
    forgotpassword,
    resetpassword,
}