
class GetSortedLabels{

    /**
     * 
     * @param {Object} labelRepo labelRepo
     * @param {Object} helper helper
     */
    constructor(imageLabelRepo, helper){
      this.helper = helper;
      this.imageLabelRepo = imageLabelRepo;
    }
      
    async handleRequest(req,res){    
        try{
          const userId = req.userData.userId;
          if(!userId) {
            return this.helper.writeResponse({msg : "Empty User ID" ,code : 404},null,res);
          }
          const labelResult = await this.imageLabelRepo.getSortedLabels(userId);
          if(labelResult.rows.length === 0){
            return this.helper.writeResponse({msg : "Labels are Not exist" ,code : 404},null,res);
          }
          else{
            let labelRows = labelResult.rows;
            labelRows = labelRows.slice(0,6);
            return this.helper.writeResponse(null,{"data" : labelRows},res);  
          }
        }
        catch(error){
          console.log(error);
          return this.helper.writeResponse({msg : "Internal server error" ,code : 500},null,res);
        }
      }
  }
  
  
  module.exports = GetSortedLabels;