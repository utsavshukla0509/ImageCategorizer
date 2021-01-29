

class UpdateDetail{
    constructor(helper,userRepo,userUtility){
        this.helper = helper;
        this.userRepo = userRepo;
        this.userUtility = userUtility;
    }

    async handleRequest(req,res){

        try{
            const userId = req.userData.userId;
            const {username,email,password,currentpassword,otp} = req.body;
            
            const userResult = await this.userRepo.getUserDetailById(userId);
            const userInfo = userResult.rows[0];

            let obj = {};
            if(username === ""){obj.username = userInfo.username;}
            if(email === ""){obj.email = userInfo.email;}
            if(password === ""){obj.password = userInfo.password;}


            if(password === "" && currentpassword === ""){
                if(username !== ""){
                    obj.username = username;
                }
                if(email !== "" && otp !== ""){
                   const storedOTP = await this.userUtility.getValue(email);
                   if(storedOTP !== null){
                        if(storedOTP === otp){
                            obj.email = email;
                        }
                        else{
                            return this.helper.writeResponse({msg : "Incorrect OTP" ,code : 404},null,res);
                        }
                    }
                    else{
                        return this.helper.writeResponse({msg : "OTP Expired" ,code : 404},null,res);
                    }
                }
            }
            else{
                const result = await this.userUtility.comparePassword(password,userInfo.password);
                if(result === false){
                    return this.helper.writeResponse({"msg" : "Incorrect Old Password!" ,code : 404},null,res);
                }
                else{
                    const hash = await this.userUtility.hash(password);
                    obj.password = hash;
                }
            }
            await this.userRepo.updateDetail(userId,obj);
            return this.helper.writeResponse(null,{"msg" : "Your profile is updated"},res);
        }
        catch(error){
            console.log(error);
            return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
        }
    }
};


module.exports = UpdateDetail;