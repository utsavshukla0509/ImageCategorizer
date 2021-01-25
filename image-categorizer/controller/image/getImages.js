
class GETIMAGES{

    /**
     * 
     * @param {Object} imageLabelRepo imageLabelRepo
     * @param {Object} helper helper
     */
    constructor(imageLabelRepo, helper){
      this.imageLabelRepo = imageLabelRepo;
      this.helper = helper;
    }
      
    async handleRequest(req,res){    
        try{
          const {userId,label} = req.params;
          if(!userId || !label) {
            return this.helper.writeResponse({msg : "Empty User ID or Label" ,code : 404},null,res);
          }
          const userResult = await this.imageLabelRepo.getImagesByLabel(userId,label);
          if(userResult.rows.length === 0){
            return this.helper.writeResponse({msg : "Given Label is not found" ,code : 404},null,res);
          }
          else{
            return this.helper.writeResponse(null,{"data" : userResult.rows},res);  
          }
        }
        catch(error){
          console.log(error);
          return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
        }
      }
  }
  
  
  module.exports = GETIMAGES;