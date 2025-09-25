const express = require('express');
const router = express.Router();

router.get("/sales", (req, res) =>{
    res.render("addSales");
})



router.get("/viewsales", (req, res) =>{
    res.render("viewSales");
})











module.exports = router;