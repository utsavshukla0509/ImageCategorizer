

class ForgotUpdate{
    constructor(userRepo,userUtility,helper){
        this.userRepo = userRepo;
        this.userUtility = userUtility;
        this.helper = helper;
    }

    async handleRequest(req, res){

        try {
            const {password,repassword,email,otp} = req.body;
            if(password !== repassword){
                return this.helper.writeResponse({msg : "Empty Email","data" : {"verified" : false,"code" : "0"} ,code : 404},null,res);
            }
            const storedOTP = await this.userUtility.getValue(email);
            if(storedOTP !== null){
                if(storedOTP === otp){
                    const hash = await this.userUtility.hash(password);
                    await this.userRepo.updateDetailByEmail(email,hash);
                    return this.helper.writeResponse(null,{
                        "msg" : "Password is successfully updated!",
                        "verified" : true,
                        "code" : "1"
                    },res);
                }
                else{
                    return this.helper.writeResponse({msg : "Incorrect OTP","data" : {"verified" : false,"code" : "0"} ,code : 404},null,res);
                }
            }
            else{
                return this.helper.writeResponse({msg : "OTP Expired","data" : {"verified" : false,"code" : "0"} ,code : 404},null,res);
            }

        } catch(error) {
            console.log(error);
            return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
        }
    }
};

module.exports = ForgotUpdate;