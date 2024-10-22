const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const reviewSchema = new mongoose.Schema({
    comment : String,
    rating : {
        type : Number,
        min : 1,
        max : 5,
    },
    createdat : {
        type : Date,
        default : Date.now(),
    }
})

module.exports = mongoose.model("review" , reviewSchema);