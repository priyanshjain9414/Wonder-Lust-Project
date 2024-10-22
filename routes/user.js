const express = require("express");
const router = express.Router();
const User = require("../models/user.js");
const passport = require("passport");
const { saveRedirectUrl } = require("../middleware.js");
const wrapAsync = require("../utils/wrapAsync.js");
const usercontroller = require("../Controllers/user.js");


router.route("/signup")
.get(usercontroller.signupform)
.post(wrapAsync(usercontroller.signup))

router.route("/login")
.get(usercontroller.loginForm)
.post(saveRedirectUrl , passport.authenticate('local', {
    failureRedirect: '/login',
    failureFlash: true
  }),
   usercontroller.login)

router.get("/logout" , usercontroller.logout)
 

module.exports = router;

