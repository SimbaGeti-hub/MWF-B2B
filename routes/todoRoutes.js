const express = require('express');
const router = express.Router();
const multer = require("multer")

router.get("/toDo", (req, res) =>{
    res.render("todo");
})


















module.exports = router;