
class DownLoadImages {
    
    constructor(labelUtility,helper){
        this.labelUtility = labelUtility;
        this.helper = helper;
    }

  async handleRequest(req, res) {
        try{
            const userId = req.userData.userId;
            const labelList = req.params.labels.split(',');
            
            let promise = [];
            for(let i = 0;i<labelList.length;i++){
                promise.push(this.labelUtility.processLabel(userId,labelList[i])
                .catch((err)=>{
                    console.log(err,"error while download label image/s");
                }));
            }
            
            await Promise.all(promise);
            return this.helper.writeResponse(null,{"msg" : "Images Downloaded"},res);
        }
        catch(err){
            console.log(err);
        }
    }
};

module.exports = DownLoadImages;
