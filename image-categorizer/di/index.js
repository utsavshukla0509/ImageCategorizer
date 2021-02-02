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
    clarifaiAPI : asValue(middleware.clarifaiAPI),
    cloudinaryAPI : asValue(middleware.cloudinaryAPI),
});




//REPO
container.register('userRepo', asClass(require("../repository/userRepo"), getScope()));
container.register('imageRepo', asClass(require("../repository/imageRepo"), getScope()));
container.register('imageLabelRepo', asClass(require("../repository/imageLabelRepo"), getScope()));


//APIS
//User
container.register('userDetailApi', asClass(require("../controller/user/userDetail"), getScope()));
container.register('signInApi', asClass(require("../controller/user/signIn"), getScope()));
container.register('signUpApi', asClass(require("../controller/user/signUp"), getScope()));
container.register('generateOTPApi', asClass(require("../controller/user/generateOTP"), getScope()));
container.register('addUserImageApi', asClass(require("../controller/user/addImage"), getScope()));
container.register('deleteUserImageApi', asClass(require("../controller/user/deleteImage"), getScope()));
container.register('updateDetailApi', asClass(require("../controller/user/updateDetail"), getScope()));
container.register('forgotVerifyApi', asClass(require("../controller/user/forgotVerify"), getScope()));
container.register('forgotUpdateApi', asClass(require("../controller/user/forgotUpdate"), getScope()));


//Image
container.register('addImageApi', asClass(require("../controller/image/addImage"), getScope()));
container.register('getImagesApi', asClass(require("../controller/image/getImages"), getScope()));
container.register('getImagesByDateApi', asClass(require("../controller/image/getImagesByDate"), getScope()));

//Label
container.register('getLabelsApi', asClass(require("../controller/label/getLabels"), getScope()));
container.register('getSortedLabelsApi', asClass(require("../controller/label/getSortedLabels"), getScope()));
container.register('downloadImagesApi', asClass(require("../controller/label/downloadImages"), getScope()));

//Utility
container.register('userUtility', asClass(require("../utilities/userUtility"), getScope()));
container.register('imageUtility', asClass(require("../utilities/imageUtility"), getScope()));
container.register('labelUtility', asClass(require("../utilities/labelUtility"), getScope()));
container.register('helper', asClass(require("../utilities/helper"), getScope()));



module.exports = container;