if(process.env.NODE_ENV != "production"){
require('dotenv').config()
}


const express = require("express");
const app = express();
const mongoose = require("mongoose");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const path = require('path');
const methodOverride = require("method-override");
const ExpressError = require("./utils/ExpressError.js");
const ejsMate = require("ejs-mate");
app.engine("ejs" , ejsMate);
const passport = require("passport");
const localstrategy = require("passport-local");
let User = require("./models/user.js");

const listings = require("./routes/listing.js");
const review = require("./routes/review.js");
const userrout = require("./routes/user.js");

app.set("view engine" , "ejs");
app.set("views" , path.join(__dirname , "views"));
app.use(express.urlencoded({extended : true}));
app.use(methodOverride("_method"));
app.use(express.static(path.join(__dirname,"/public")));

const store = MongoStore.create({
    mongoUrl: process.env.AtlasMongo_url,
    crypto: {
       secret : process.env.Secret
    },
    touchAfter: 24*3600,
})

store.on("error" , ()=>{
    console.log("Error In Mongos Session Store" , error)
})
const sessionoption = {
     store:store,
     secret: process.env.Secret,
     resave:false,
     saveUninitialized : true,
     cookie : {
        secure: false,
        expires : Date.now() + 1000*60*60*24*3,
        maxAge : 1000*60*60*24*3,
        httpOnly : true,
     }
}


app.use(session(sessionoption));
app.use(flash());

app.use((req,res,next) =>{
    res.locals.success = req.flash('success');
    res.locals.error = req.flash('error');
    res.locals.curruser = req.User;
    next();
})

async function main() {
    await mongoose.connect(process.env.AtlasMongo_url);
}
main().then(() =>{
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});
app.get('/' , (req,res) =>{
    res.send("Hi, I am Root");
});


app.use(passport.initialize());
app.use(passport.session());
passport.use(new localstrategy(User.authenticate()))
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


// app.get("/demouser" , async (req,res) =>{
//        let fakeuser = new user({
//         email : "college@gmail.com",
//         username : "College"
//        })

//        let registereduser = await user.register(fakeuser , "Hello");
//        res.send(registereduser);
// })

app.use("/listings" , listings);
app.use("/listings/:id/reviews" , review);
app.use("/" , userrout);

app.all("*" , (req,res,next) =>{
    next(new ExpressError(404,'Page Not Found'));
})
app.use((err,req,res,next) =>{
    const { status = 500, message = 'Something Went Wrong' } = err;
    res.status(status).render("error.ejs" , {message});
})

app.listen(3000 , () =>{
    console.log("App is Listening The Port 3000");
})