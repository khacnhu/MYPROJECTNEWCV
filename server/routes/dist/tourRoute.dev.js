"use strict";

var express = require("express");

var router = express.Router();

var _require = require("../controllers/tourController"),
    createTour = _require.createTour;

router.post("/", createTour);
module.exports = router;