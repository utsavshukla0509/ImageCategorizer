
class AddImage {

    constructor(imageRepo, imageLabelRepo, helper, imageUtility){
        this.imageRepo = imageRepo;
        this.helper = helper;
        this.imageLabelRepo = imageLabelRepo;
        this.imageUtility = imageUtility;
    }

  async handleRequest(req, res) {

      try{

        const userId = req.userData.userId;
        if(!userId) {
            return this.helper.writeResponse({msg : "missing userId" ,code : 404},null,res);
        }
        
        let promise = [];
        req.files.forEach(async (image)=>{
          promise.push(this.imageUtility.processImage(userId,image)
          .catch((err)=>{
              console.log(err,"error while inserting image/s");
          }));
        });
        await Promise.all(promise);

        const userResult = await this.imageLabelRepo.getImagesByLabel(userId,"all");
        return this.helper.writeResponse(null,{"data" : userResult.rows},res);  
      }
      catch(error){
          console.log(error);
          return this.helper.writeResponse({msg : "Internal Server Error" ,code : 500},"",res);
      }
    }
};

module.exports = AddImage;
