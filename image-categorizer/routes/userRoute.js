const express = require("express");
const router = express.Router();
// const checkAuth = require("../middleware/checkAuth");

router.post("/signup",(req,res,next) => {
    req.container.resolve('signUpApi').handleRequest(req,res).catch(next);
});

router.post("/signin",(req,res,next) => {
    req.container.resolve('signInApi').handleRequest(req,res).catch(next);
});

router.get("/getdetail/:userId",(req,res,next) => {
    req.container.resolve('userDetailApi').handleRequest(req,res).catch(next);
});

router.post("/generateotp",(req,res,next) => {
    req.container.resolve('generateOTPApi').handleRequest(req,res).catch(next);
});


module.exports = router;