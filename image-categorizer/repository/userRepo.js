


class UserRepo {

constructor(postgresClient) {
    this.postgresClient = postgresClient;
}

    async getUserDetailById(userId){
        const query = `SELECT * FROM public.userinfo WHERE userid = ${userId};`;
        return this.postgresClient.query(query);
    }

    async getUserDetailByEmail(email){
        const query = `SELECT * FROM public.userinfo WHERE email = '${email}';`;
        return this.postgresClient.query(query);
    }

    async createUser(username,email,password){
        const query = `INSERT INTO public.userinfo ("username","email","password") VALUES ('${username}','${email}','${password}');`;
        return this.postgresClient.query(query);
    }

    async addUserImage(userId,imageUrl){
        const query = `UPDATE public.userinfo SET image = '${imageUrl}' WHERE userid = ${userId}`;
        return this.postgresClient.query(query);
    }

    async updateDetail(userId,obj){

        const query = `UPDATE public.userinfo 
            SET username = '${obj.username}',
                email = '${obj.email}',
                password = '${obj.password}'
            WHERE userid = ${userId}`;
        return this.postgresClient.query(query);
    }

    async updateDetailByEmail(email,password){

        const query = `UPDATE public.userinfo 
            SET password = '${password}'
            WHERE email = '${email}'`;
        return this.postgresClient.query(query);
    }

    
}

module.exports = UserRepo;