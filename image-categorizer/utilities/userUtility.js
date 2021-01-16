const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
require('dotenv').config();
const nodemailer = require("nodemailer");
const otpGenerator = require('otp-generator')

class UserUtility{

    constructor(redisClient){
        this.redisClient = redisClient;
    }

    async getValue(key) {
        return await this.redisClient.get(key);
    }

    async hash(password){
        return bcrypt.hash(password,10);
    }

    async comparePassword(newPassword,oldPassword){
        return bcrypt.compare(newPassword,oldPassword);
    }

    async generateToken(userData){
        const token = await jwt.sign(userData, "MONGO_SECRET", { expiresIn: "7d" });
        return token;
    }   

    async initNodeMailer(){
        let transporter = nodemailer.createTransport({
            port: 587,
            secure: true,
            service: "gmail",
            auth: {
                user: process.env.EMAIL, // generated ethereal user
                pass: process.env.PASSWORD // generated ethereal password
            },
        });
        return transporter;
    }


    async createOTP(email,transporter){
        var otp = otpGenerator.generate(6, { alphabets : false,specialChars : false,upperCase : false });

        // set otp in redis (with email as key) with expiration time(5 min)
        this.redisClient.set(email,otp,'PX',300000);

        //Before sending a mail given link option will be TRUE 
        //of those gmail account by which you send a message
        //"https://myaccount.google.com/lesssecureapps?pli=1"
        
        transporter
        .sendMail({
            from: "ImageCat",
            to: `${email}`,
            subject: "Welcome in our Community, ImageCat ",
            text: `Hello Dear ${email}`,
            html : "<h3>OTP for account verification is </h3>"  + 
            "<h1 style='font-weight:bold;'>" + otp +"</h1>" + 
            "<br/><div>*OTP will expire in 5 minute</div>",
        })
        .then(() => console.log("Email has been sent!"))
        .catch((err) => console.log(err));
    }

}

module.exports = UserUtility; 