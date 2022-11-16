const mongoose = require("mongoose");


const tourSchema = mongoose.Schema({
    title: String,
    description: String,
    name: String,
    creator: String,
    tags: [String],
    imageFile: String,
    likeCount: {
        type: [String],
        default: [],
    },

}, {
    timestamps: true
})

const Tour = mongoose.model("Tour", tourSchema)

module.exports = Tour