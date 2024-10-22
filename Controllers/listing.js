const Listing = require("../models/listing.js");


module.exports.index = async (req,res) =>{
    const alllistings = await Listing.find({});
    res.render('./listings/index.ejs' , {alllistings});
    }

module.exports.RendernewForm = (req, res) => {
    res.render("./listings/new.ejs");
 }

module.exports.showlisting = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findById(id)
    .populate("review")
    .populate("owner")
    if(!listing){
       req.flash("error" , "Listing You Reqested Does Not Exist");
       res.redirect("/listings")
    }
    res.render("./listings/show.ejs" , {listing});
}

module.exports.createlisting = async (req,res,next) =>{
    let url = req.file.path;
    let filename = req.file.filename;
    let listing = new Listing(req.body.listing);
    listing.owner = req.user._id;
    listing.image = {url , filename}
    await listing.save();
    req.flash("success" , "Listing Created Sucessfully");
    res.redirect("/listings");   
}

module.exports.renderEditForm = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id);
    if(!listing){
        req.flash("error" , "Listing You Reqested Does Not Exist");
        res.redirect("/listings")
     }

    let originalimage =  listing.image.url;
    originalimage = originalimage.replace("/upload" , "/upload/h_250,w_250,q_auto,f_auto");
    res.render("./listings/edit.ejs", { listing ,originalimage});
}

module.exports.updateListing = async (req, res) => {
    let { id } = req.params;
    let listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

    if(typeof req.file !== "undefined"){
    let url = req.file.path;
    let filename = req.file.filename;
    listing.image = {url,filename};
    await listing.save(); 
    }   

    req.flash("success" , "Listing Updated Sucessfully");
    res.redirect(`/listings/${id}`);
}

module.exports.deleteListing = async (req,res) =>{
    let {id} = req.params;
    const listing = await Listing.findByIdAndDelete(id);
    req.flash("success" , "Listing Deleted Succesfully");
    res.redirect("/listings");
}