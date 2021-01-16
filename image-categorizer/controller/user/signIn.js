
class SignIn{

    constructor(userRepo, helper, userUtility){
        this.userRepo = userRepo;
        this.helper = helper;
        this.userUtility = userUtility;
    }


    async handleRequest(req, res){
        try{

            const { email,password } = req.body;
            if(!email || !password) {
                return this.helper.writeResponse({msg : "missing email or password field" ,code : 404},null,res);
            }
            const userData = await this.userRepo.getUserDetailByEmail(email);
            if(userData.rows.length === 0){
                return this.helper.writeResponse({msg : "Incorrect Email or Password!" ,code : 404},{status : false},res);
            }
            else{
                const result = await this.userUtility.comparePassword(password,userData.rows[0].password);
                if(result){
                    let userInfo = {};
                    userInfo.userid = userData.rows[0].userid;
                    userInfo.username = userData.rows[0].username;
                    userInfo.email = userData.rows[0].email;
                    const token = await this.userUtility.generateToken(userInfo);   
                    return this.helper.writeResponse(null,{
                        msg: "Authentication has been successful",
                        status : true,
                        token : token,
                        userInfo
                    },res);                
                }
                else{
                    return this.helper.writeResponse({msg : "Incorrect Email or Password!" ,code : 404},{status : false},res);
                }
            }   
        }
        catch(error){
            console.log(error);
            return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
        }
    }
};

module.exports = SignIn;