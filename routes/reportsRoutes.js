const express = require('express');
const router = express.Router();
const multer = require("multer")

router.get("/reports", (req, res) =>{
    res.render("reports");
})


















module.exports = router;