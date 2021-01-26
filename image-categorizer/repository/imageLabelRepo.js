


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
    
    async getLabels(userid){
        const query = `SELECT DISTINCT(label) FROM public.userimagelabel WHERE userid = ${userid};`;
        return this.postgresClient.query(query);
    }

    async getSortedLabels(userid){
        const query = `SELECT label, COUNT(label)AS Frequency FROM public.userimagelabel
            WHERE userid = ${userid}
            GROUP BY label
            ORDER BY COUNT(label) DESC;`;
        return this.postgresClient.query(query);
    }

    }
    
    module.exports = ImageLabelRepo;