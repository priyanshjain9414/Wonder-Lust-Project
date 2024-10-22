const User = require("../models/user.js");


module.exports.signupform = (req, res) => {
    res.render("user/signup.ejs");
}

module.exports.signup = async(req, res) => {
    try{
    let { username, email, password } = req.body;
        const newUser = new User({ email, username });
        const registeredUser = await User.register(newUser, password);
        console.log(registeredUser);
        req.login(registeredUser , (err) =>{
            if(err){
                return next(err);
            }
                req.flash("success" , "You Are Login Now");
                res.redirect("/listings");
        })
    }catch(e){
        req.flash("error" , e.message);
        res.redirect("/signup");
    }
}

module.exports.loginForm = (req, res) => {
    res.render("user/login.ejs");
}

module.exports.login = (req, res) => {
    console.log('Authentication successful');
    req.flash('success', `Welcome back, ${req.user.username}!`);
    let redirectUrl = res.locals.redirectUrl || "/listings"
    res.redirect(redirectUrl);
}

module.exports.logout = (req,res,next) =>{
    req.logOut((err) =>{
        if(err){
         return next(err); 
        }
        req.flash("success" , "You Are Logged Out Now");
        res.redirect("/login");
})}