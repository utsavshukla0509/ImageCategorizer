const { createContainer,asValue, asClass, InjectionMode, Lifetime } = require('awilix');

/**
 *
 *@returns {Object} lifetime
 */

function getScope(){
    return {lifetime : Lifetime.SINGLETON };
}

//Driver, Config
const middleware = require("../driver");



const container = createContainer({injectionMode : InjectionMode.CLASSIC});


container.register({
    postgresClient : asValue(middleware.postgresClient),
    redisClient : asValue(middleware.redisClient),
});




//REPO
container.register('userRepo', asClass(require("../repository/userRepo"), getScope()));


//API
container.register('userDetailApi', asClass(require("../controller/user/userDetail"), getScope()));
container.register('signInApi', asClass(require("../controller/user/signIn"), getScope()));
container.register('signUpApi', asClass(require("../controller/user/signUp"), getScope()));
container.register('generateOTPApi', asClass(require("../controller/user/generateOTP"), getScope()));


//Utility
container.register('userUtility', asClass(require("../utilities/userUtility"), getScope()));
container.register('helper', asClass(require("../utilities/helper"), getScope()));



module.exports = container;