const express = require("express");
const router = express.Router({ mergeParams: true});

const Listing = require("../models/listing.js"); 
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const { reviewSchema } = require("../schema.js");

const reviewcontroller = require("../Controllers/review.js")
// Middleware to validate reviews
const validatereview = (req, res, next) => {
    const { error } = reviewSchema.validate(req.body);
    if (error) {
        throw new ExpressError(400, error.message);
    } else {
        next();
    }
};

// Review Route
router.post("/", validatereview, wrapAsync(reviewcontroller.createReview));

// Delete Review Route
router.delete("/:reviewId", wrapAsync(reviewcontroller.deleteReview));

module.exports = router;
