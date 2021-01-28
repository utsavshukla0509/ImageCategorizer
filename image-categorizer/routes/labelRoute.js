const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");



router.get("/getlabels",checkAuth,(req,res,next) => {
    req.container.resolve('getLabelsApi').handleRequest(req,res).catch(next);
});

router.get("/getsortedlabels",checkAuth,(req,res,next) => {
    req.container.resolve('getSortedLabelsApi').handleRequest(req,res).catch(next);
});

router.get("/downloadimages/:labels",checkAuth,(req,res,next) => {
    req.container.resolve('downloadImagesApi').handleRequest(req,res).catch(next);
});



module.exports = router;