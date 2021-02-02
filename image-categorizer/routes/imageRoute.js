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


router.post("/addimage",checkAuth,upload.array('image[]'),(req,res,next) => {
    req.container.resolve('addImageApi').handleRequest(req,res).catch(next);
});

router.get("/getimages/:label",checkAuth,(req,res,next) => {
    req.container.resolve('getImagesApi').handleRequest(req,res).catch(next);
});

router.get("/getimagesbydate/:date",checkAuth,(req,res,next) => {
    req.container.resolve('getImagesByDateApi').handleRequest(req,res).catch(next);
});

module.exports = router;