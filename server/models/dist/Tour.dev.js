"use strict";

var mongoose = require("mongoose");

var tourSchema = mongoose.Schema({
  title: String,
  description: String,
  name: String,
  creator: String,
  tags: [String],
  imageFile: String,
  likeCount: {
    type: Number,
    "default": 0
  }
}, {
  timestamps: true
});
var Tour = mongoose.model("Tour", tourSchema);
module.exports = Tour;