const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const ExpressError = require("../utils/ExpressError.js");
const {listingSchema , reviewSchema} = require("../schema.js");
const Listing = require("../models/listing.js");
const {LoggedIn} = require("../middleware.js");
const multer  = require('multer')
const {storage} = require("../CloudConfig.js");
const upload = multer({storage})


const listingcontroller = require("../Controllers/listing.js");

const validateschema = (req,res,next) =>{
    let {error} = listingSchema.validate(req.body);
    console.log(error);
    if(error){
        throw new ExpressError(400,error);
    }else{
        next();
    }
}

router.route('/')
//index Route
.get(LoggedIn, wrapAsync(listingcontroller.index))
//Create Route:-
.post(LoggedIn, upload.single('listing[image]'),validateschema,wrapAsync(listingcontroller.createlisting));


//new Route:-
 router.get("/new",LoggedIn, listingcontroller.RendernewForm);
 
router.route("/:id")
 //Show Route:-
.get(wrapAsync(listingcontroller.showlisting))
// Update route
.put(LoggedIn, upload.single('listing[image]'),wrapAsync(listingcontroller.updateListing))
 //Delete Route:-
.delete(LoggedIn,wrapAsync(listingcontroller.deleteListing))

//EDIT route:-
// Edit route
router.get("/:id/edit", LoggedIn,wrapAsync(listingcontroller.renderEditForm));

 module.exports = router;