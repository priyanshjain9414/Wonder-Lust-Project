const express = require("express");
const router = express.Router();
//Index for User
router.get("/" , (req,res) =>{
    res.send("GET for User");
})
//Show for User
router.get("/:id" , (req,res) =>{
    res.send("GET for User id");
})
//Post for User
router.post("/" , (req,res) =>{
    res.send("POST for User");
})
//Delete for User
router.delete("/:id" , (req,res) =>{
    res.send("Delete for User id");
})

module.exports = router;