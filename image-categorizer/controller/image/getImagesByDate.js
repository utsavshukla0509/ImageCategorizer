
class GETIMAGESBYDATE{

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
          const {date} = req.params;
          // console.log(date);
          const userId = req.userData.userId;
          
          if(date === ""){
            this.helper.writeResponse({msg : "Empty Date" ,code : 404},null,res);
          }


          // let changeFormatDate = date.slice(6) + "-" + date.slice(3,5) + "-" + date.slice(0,2);
          if(!userId || !date) {
            return this.helper.writeResponse({msg : "Empty User ID or Date" ,code : 404},null,res);
          }
          const userResult = await this.imageLabelRepo.getImagesByDate(userId,date);
          if(userResult.rows.length === 0){
            return this.helper.writeResponse({msg : "No Images" ,code : 404},null,res);
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
  
  
  module.exports = GETIMAGESBYDATE;