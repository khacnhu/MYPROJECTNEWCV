const express = require("express")
const router = express.Router()
const {signup, signin, googleSignIn} = require("../controllers/userController")


router.post("/signin", signin);
router.post("/signup", signup)
router.post("/googleSignIn", googleSignIn);

module.exports = router