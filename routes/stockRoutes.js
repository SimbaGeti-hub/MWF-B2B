const express = require('express');
const router = express.Router();
const multer = require("multer")

router.get("/stock", (req, res) =>{
    res.render("addStock");
})















module.exports = router;