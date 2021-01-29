class ForgotVerify{

    constructor(userRepo, helper, userUtility){
        this.userRepo = userRepo;
        this.helper = helper;
        this.userUtility = userUtility;
    }

    async handleRequest(req, res){

        try{
            const {email} = req.body;

            if(!email){
                return this.helper.writeResponse({msg : "Empty Email" ,code : 404},null,res);
            }
            const userData = await this.userRepo.getUserDetailByEmail(email);
            if(userData.rows.length === 0){
                return this.helper.writeResponse({msg : "Email doesn't exist!" ,code : 404},{status : false},res);
            }
            else{
                const transporter = await this.userUtility.initNodeMailer();
                await this.userUtility.createOTP(email,transporter);
                return this.helper.writeResponse(null,{"user" : email,"msg" : "OTP has been sent to your Gmail","status" : true},res);
            }
        }
        catch(err){
            console.log(err);
            return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
        }
    }

};

module.exports = ForgotVerify;