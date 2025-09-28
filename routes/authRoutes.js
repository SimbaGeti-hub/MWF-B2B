const express = require('express');
const router = express.Router();
const multer = require("multer")

router.get("/", (req, res) =>{
    res.render("index");
})





router.get("/logIn", (req, res) =>{
    res.render("logIn");
})



router.get("/logout", (req, res) =>{
    res.render("logout");
})


router.get("/signUp", (req, res) =>{
    res.render("signup");
})












module.exports = router;