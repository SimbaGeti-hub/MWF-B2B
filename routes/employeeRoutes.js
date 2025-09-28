const express = require('express');
const router = express.Router();
const multer = require("multer")

router.get("/employees", (req, res) =>{
    res.render("employees");
})



router.get("/viewEmployees", (req, res) =>{
    res.render("viewemployees");
})



















module.exports = router;