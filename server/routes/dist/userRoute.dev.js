"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/userController"),
    signup = _require.signup,
    signin = _require.signin,
    googleSignIn = _require.googleSignIn;

router.post("/signin", signin);
router.post("/signup", signup);
router.post("/googleSignIn", googleSignIn);
module.exports = router;