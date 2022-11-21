const express = require("express")
const router = express.Router()
const {signup, signin, googleSignIn, changePassword, forgotpassword} = require("../controllers/userController")
// const { auth } = require("../middlewares/auth");

router.post("/signin", signin);
router.post("/signup", signup)
router.post("/googleSignIn", googleSignIn);
router.post("/changepassword/:id", changePassword)
router.post("/forgotpassword",forgotpassword)

module.exports = router