


class ImageLabelRepo {

    constructor(postgresClient) {
        this.postgresClient = postgresClient;
    }
    
    async createImageLabel(userid,imageid,label){
        const query = `INSERT INTO public.userimagelabel ("userid","imageid","label") VALUES ('${userid}','${imageid}','${label}');`;
        return this.postgresClient.query(query);
    }

    async getImagesByLabel(userid,label){
        const query = `SELECT image FROM public.userimage WHERE imageid IN 
        (SELECT imageid FROM public.userimagelabel WHERE userid = ${userid} AND label = '${label}' );`;
        return this.postgresClient.query(query);
    }
    // const query = `SELECT image,UIL.label FROM public.userimage UI, 
    //         (SELECT imageid,label FROM public.userimagelabel WHERE userid = ${userid} AND label = '${label}' ) UIL 
    //         WHERE UI.imageid = UIL.imageid;`;
        
    }
    
    module.exports = ImageLabelRepo;