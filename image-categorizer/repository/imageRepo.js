


class ImageRepo {

    constructor(postgresClient) {
        this.postgresClient = postgresClient;
    }
    
    async createImage(userid,image){
        const query = `INSERT INTO public.userimage ("userid","image") VALUES ('${userid}','${image}');`;
        return this.postgresClient.query(query);
    }

    async getImageDetailByUserIdAndUrl(userid,email){
        const query = `SELECT * FROM public.userimage WHERE userid = ${userid} AND image = '${email}';`;
        return this.postgresClient.query(query);
    }
        
    }
    
    module.exports = ImageRepo;