class Helper {

    constructor() {

    }

    writeResponse(err, info, res) {
        if(err) {
            err.code = err.code || 500;
            console.log('req has been sent with status:', err.code);
            if(info){
                return res.status(err.code).json({"message": err.msg,"status" : info.status});
            }
            else{
                return res.status(err.code).json({message: err.msg || 'internal server error'});
            }
        } else{
            console.log('req has been sent with status: 200');
            res.status = 200;
            res.json(info);
            return res;
        }
    }

}

module.exports = Helper;