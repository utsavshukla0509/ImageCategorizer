const express = require("express");
const router = express.Router();
const checkAuth = require("../middleware/checkAuth");
const multer = require("multer");


const storage = multer.diskStorage({
    destination: (req, file, callback) => {    
        callback(null, "./uploads/");
    },
    filename: (req, file, callback) => {
        callback(null, Date.now() + "-" + file.originalname);
    },
});

const upload = multer({ storage: storage });

router.post("/signup",(req,res,next) => {
    req.container.resolve('signUpApi').handleRequest(req,res).catch(next);
});

router.post("/signin",(req,res,next) => {
    req.container.resolve('signInApi').handleRequest(req,res).catch(next);
});

router.post("/generateotp",(req,res,next) => {
    req.container.resolve('generateOTPApi').handleRequest(req,res).catch(next);
});

router.get("/getdetail",checkAuth,(req,res,next) => {
    req.container.resolve('userDetailApi').handleRequest(req,res).catch(next);
});

router.put("/addimage",checkAuth,upload.single('image'), (req,res,next) => {
    req.container.resolve('addUserImageApi').handleRequest(req,res).catch(next);
});

router.patch("/deleteimage",checkAuth, (req,res,next) => {
    req.container.resolve('deleteUserImageApi').handleRequest(req,res).catch(next);
});

router.patch("/updateandverify",checkAuth,(req,res,next) => {
    req.container.resolve('updateDetailApi').handleRequest(req,res).catch(next);
});

router.post("/forgotandverify",checkAuth,(req,res,next) => {
    req.container.resolve('forgotVerifyApi').handleRequest(req,res).catch(next);
});

router.patch("/forgotandupdate",checkAuth,(req,res,next) => {
    req.container.resolve('forgotUpdateApi').handleRequest(req,res).catch(next);
});


module.exports = router;