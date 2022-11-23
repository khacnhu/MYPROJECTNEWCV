const express = require("express")
const router = express.Router()
const {signup, signin, googleSignIn, changePassword, forgotpassword, resetpassword} = require("../controllers/userController")
// const { auth } = require("../middlewares/auth");

router.post("/signin", signin);
router.post("/signup", signup)
router.post("/googleSignIn", googleSignIn);
router.post("/changepassword/:id", changePassword)
router.post("/forgotpassword",forgotpassword)
router.post("/passwordreset/reset/:resetToken", resetpassword)

module.exports = router