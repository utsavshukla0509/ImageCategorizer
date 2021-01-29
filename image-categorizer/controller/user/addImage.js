

class AddImage {
    constructor(userRepo, imageLabelRepo, helper, imageUtility){
        this.userRepo = userRepo;
        this.helper = helper;
        this.imageUtility = imageUtility;
    }
  
  async handleRequest(req, res) {
      // console.log(req.body);

      try{
        const userId = req.userData.userId;
        const username = req.userData.username;
        const email = req.userData.email;

        const cloudinaryResult =  await this.imageUtility.UploadImageByCloudinary(req.file.path);
        const userResult = await this.userRepo.addUserImage(userId,cloudinaryResult);
        let userInfo = {};
        userInfo.userId = userId;
        userInfo.username = username;
        userInfo.email = email;
        userInfo.image = cloudinaryResult;

        return this.helper.writeResponse(null,{userInfo,"msg" : "Profile Updated"},res);
      }
      catch(error){
        console.log(error);
        return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
      }
  }
};

module.exports = AddImage;