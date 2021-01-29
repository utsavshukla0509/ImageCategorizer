

class DeleteImage {
    constructor(userRepo, helper, imageUtility){
        this.userRepo = userRepo;
        this.helper = helper;
        this.imageUtility = imageUtility;
    }
  
  async handleRequest(req, res) {
      // console.log(req.body);

      try{
        const userId = req.userData.userId;
        await this.userRepo.addUserImage(userId,"");
        return this.helper.writeResponse(null,{"msg" : "Profile Updated"},res);
      }
      catch(error){
        console.log(error);
        return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
      }
  }
};

module.exports = DeleteImage;