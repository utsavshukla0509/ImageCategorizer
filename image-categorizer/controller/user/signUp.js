
class SignUp{
    
    constructor(userRepo, userUtility, helper){
        this.userUtility = userUtility;
        this.userRepo = userRepo;
        this.helper = helper;
    }

    async handleRequest(req, res){

            try{
                const {username,email,password,otp} = req.body;
                if(!username){
                    return this.helper.writeResponse({msg : "missing username field" ,code : 404},null,res);
                }
                else if(!email){
                    return this.helper.writeResponse({msg : "missing email field" ,code : 404},null,res);
                }
                else if(!password){
                    return this.helper.writeResponse({msg : "missing password field" ,code : 404},null,res);
                }
                else if(!otp){
                    return this.helper.writeResponse({msg : "missing otp field" ,code : 404},null,res);
                }

                const storedOTP = await this.userUtility.getValue(email);
                if(storedOTP !== null){
                    if(storedOTP === otp){
                        const hash = this.userUtility.hash(password);
                        await this.userRepo.createUser(username,email,hash);
                        const userData = await this.userRepo.getUserDetailByEmail(email);
                        return this.helper.writeResponse(null,{
                            message: "The user account and platform has been signed/set up successfully!",
                            status : true,
                            userData
                        },res);
                    }
                    else{
                        return this.helper.writeResponse({msg : "Incorrect OTP" ,code : 404},{status : false},res);
                    }
                }
                else{
                    return this.helper.writeResponse({msg : "OTP expired" ,code : 404},{status : false},res);
                }   
                
            }
            catch(err){
                console.log(err);
                return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
            }
    }
};

module.exports = SignUp;