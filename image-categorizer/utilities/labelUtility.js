const download = require('image-downloader')
const util = require('util');
var fs = require('fs');
const path = require('path'); 

class LabelUtility{

    constructor(imageLabelRepo){
        this.imageLabelRepo = imageLabelRepo;
        this.mkdir = util.promisify(fs.mkdir);
    }

    async processLabel(userId,label){

        try{
            await this.mkdir(path.join("/home/utsav/Desktop", label));
            const userImages = await this.imageLabelRepo.getImagesByLabel(userId,label);

            for(let i = 0;i<userImages.rows.length;i++){
                let imageUrl = userImages.rows[i].image;
    
                const options = {
                url: imageUrl,
                dest: "/home/utsav/Desktop/" + label
                }
                await download.image(options);
            }
        }   
        catch(err){
            console.log(err);
            console.log("err while downloading images");
        }
    }
}

module.exports = LabelUtility; 