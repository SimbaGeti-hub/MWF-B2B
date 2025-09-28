const express = require('express');
const router = express.Router();
const multer = require("multer")

router.get("/products", (req, res) =>{
    res.render("products");
})














module.exports = router;