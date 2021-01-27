
class UserDetail{

  /**
   * 
   * @param {Object} userRepo userRepo
   * @param {Object} helper helper
   */
  constructor(userRepo, helper){
    this.userRepo = userRepo;
    this.helper = helper;
  }
    
  async handleRequest(req,res){    
      try{
        const userId = req.userData.userId;
        if(!userId) {
          return this.helper.writeResponse({msg : "Empty User ID" ,code : 404},null,res);
        }
        const userResult = await this.userRepo.getUserDetailById(userId);
        if(userResult.rows.length === 0){
          return this.helper.writeResponse({msg : "User Not exist" ,code : 404},null,res);
        }
        else{
          return this.helper.writeResponse(null,{"data" : userResult.rows[0]},res);  
        }
      }
      catch(error){
        console.log(error);
        return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
      }
    }
}


module.exports = UserDetail;