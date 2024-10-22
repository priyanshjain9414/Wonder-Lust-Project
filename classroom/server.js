const express = require("express");
const app = express();
const path = require('path');
app.set("views" , path.join(__dirname,"/Views"));
app.use(express.static(path.join(__dirname,"/public")))
const cookieparser = require("cookie-parser");
//app.use(cookieparser());
// app.use(cookieparser("secretcode"));
const session = require("express-session");
const flash = require("connect-flash");

const sessionoption = {
    secret:"PJ",
    resave:false,
    saveUninitialized:true
};

app.use(session(sessionoption));
app.use(flash());
app.listen(3000,()=>{
    console.log("App is Listening to Port 3000");
})

app.use((req,res,next) =>{
    res.locals.messages = req.flash("success")
    next()
})
app.get("/register",(req,res) =>{
    let {name = "anonymous"} = req.query;
    req.session.name = name;
    req.flash("success" , "Sucessful User Registration");
    res.send(name);
})
app.get("/hellow" ,(req,res) =>{
    // req.locals.messages = req.flash("sucess")
    res.render("page.ejs",{name : req.session.name});
})
// app.get("/hellow" ,(req,res) =>{
//     res.send(`Hellow ${req.session.name}`)
// })

// app.get("/test" , (req,res) =>{
//     res.send("Test Sucessfull");
// })

// app.get("/reqcount" , (req,res) =>{
//     if(req.session.count){
//         req.session.count++;
//     }else{
//         req.session.count = 1;
//     }
//     res.send(`You Send A Request ${req.session.count} Times`);
// })



//COOKIES:-
// const user = require("./routes/user.js");
// const post = require("./routes/post.js");

// app.use("/router" , user);
// app.use("/post" , post);


// app.get("/getsignedcookies" , (req,res) =>{
//     res.cookie("color" , "red" ,{signed : true})
//     res.send("Send You Singed Cookie");
// })
// app.get("/verify",(req,res) =>{
//     res.send(req.signedCookies);
// })

// //Cookies:--
// app.get("/getcookies" , (req,res) =>{
//     res.cookie("Hellow" , "Greet");
//     res.cookie("MadeIN" , "INDIA");
//     res.send("Send You Some Cookie");
// })


// app.get("/greet" ,(req,res) =>{
//     let {name = synonyms} = req.cookies;
//     res.send(`Hi , ${name}`);
// })

// app.get("/" , (req,res) =>{
//     console.dir(req.cookies);
//     res.send("Hi I am Root!");

// })



