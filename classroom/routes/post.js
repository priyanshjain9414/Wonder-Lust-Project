const express = require("express");
const router = express.Router();


//Index for Post
router.get("/" , (req,res) =>{
    res.send("GET for post");
})
//Show for Post
router.get("/:id" , (req,res) =>{
    res.send("GET for post id");
})
//Post for Post
router.post("/" , (req,res) =>{
    res.send("POST for post");
})
//Delete for Post
router.delete("/:id" , (req,res) =>{
    res.send("Delete for post id");
})

module.exports = router;