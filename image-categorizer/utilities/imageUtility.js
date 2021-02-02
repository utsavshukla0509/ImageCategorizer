var fs = require('fs');
const Clarifai = require('clarifai');
const util = require('util');
const im = require('imagemagick');
//https://github.com/rsms/node-imagemagick

class ImageUtility{

    constructor(clarifaiAPI,cloudinaryAPI,imageRepo,imageLabelRepo){
        this.clarifaiAPI = clarifaiAPI;
        this.cloudinaryAPI = cloudinaryAPI;
        this.imageRepo = imageRepo;
        this.imageLabelRepo = imageLabelRepo;
        this.readFile = util.promisify(fs.readFile);
    }


    async getFeatures(file){
        var bitmap = fs.readFileSync(file);
        let base64str =  new Buffer.from(bitmap).toString('base64');
        const response =  await this.clarifaiAPI.models.predict(Clarifai.GENERAL_MODEL, {base64: base64str})
        const concepts = response['outputs'][0]['data']['concepts'];
        let result = [];

        concepts.forEach(function (item) {
            result.push({name:item.name,value: item.value}); 
        });
        return result; 
    }

    async UploadImageByCloudinary(imgData){
        try{
          const image = await this.cloudinaryAPI.uploader.upload(imgData);
            return image.url;
        }
        catch(err){
          console.log(err);
        };
      }

      getStuff(path) {
        return this.readFile(path);
      }


      async processImage(userId,imageInfo){

        let promises = [];
        promises.push(this.UploadImageByCloudinary(imageInfo.path));
        promises.push(this.getFeatures(imageInfo.path));
        const promiseResult = await Promise.all(promises); 
    
        const cloudinaryResult = promiseResult[0];
        const newDate = await this.extractDate(cloudinaryResult);
        let features = promiseResult[1];
        let featureList = features.slice(0,5);
    
        await this.getStuff(imageInfo.path);
        await this.imageRepo.createImage(userId,cloudinaryResult);
        const imageResult = await this.imageRepo.getImageDetailByUserIdAndUrl(userId,cloudinaryResult);
        const imageId = imageResult.rows[0].imageid;

        //For All label
        await this.imageLabelRepo.createImageLabel(userId,imageId,"all",newDate);

        //For rest labels
        let labelPromises = [];
        featureList.forEach(async (item) => {
          labelPromises.push(this.imageLabelRepo.createImageLabel(userId,imageId,item.name,newDate)
          .catch((err)=>{
            console.log(err,"error while inserting labels");
        }));
        });
        Promise.all(labelPromises);          
      }

      async extractDate(imageUrl){

        return new Promise((resolve,reject)=>{
          im.identify(imageUrl,function(err, features){
            if (err) reject(err);
            return resolve(features.properties["date:modify"].slice(0,10));
          });
        })
      }
    
}

module.exports = ImageUtility; 