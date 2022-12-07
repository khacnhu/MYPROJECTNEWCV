const express = require("express")
const router = express.Router()
const {signup, signin, googleSignIn, changePassword, forgotpassword, resetpassword, updateUser} = require("../controllers/userController")
const { auth } = require("../middlewares/auth");

router.post("/signin", signin);
router.post("/signup", signup)
router.post("/googleSignIn", googleSignIn);
router.post("/changepassword/:id",auth  ,changePassword)
router.post("/forgotpassword",forgotpassword)
router.post("/passwordreset/reset/:resetToken", resetpassword)
router.put("/updateuser",   updateUser)

module.exports = router