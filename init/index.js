const mongoose = require("mongoose");
const initData = require("./data.js");
const Listing = require("../models/listing.js");

async function main() {
    await mongoose.connect('mongodb://127.0.0.1:27017/WonderLust');
}
main().then(() =>{
    console.log("connected to DB");
})
.catch((err) => {
    console.log(err);
});

const initDB = async () =>{
    await Listing.deleteMany({});    //before begins if data already exist then delete data first
    initData.data = initData.data.map((obj) =>(
        {...obj , owner:'6714df21a8b750b262a2f651'}
    ))
    await Listing.insertMany(initData.data);
    console.log("data was initialized");
}

initDB();