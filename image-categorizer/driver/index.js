const postgresClient = require("./dbClient");
const redisClient = require("./redisClient");
const clarifaiAPI = require("./clarifaiAPI");
const cloudinaryAPI = require("./cloudinaryAPI");

module.exports = Object.assign({},{
    postgresClient : postgresClient,
    redisClient : redisClient,
    clarifaiAPI : clarifaiAPI,
    cloudinaryAPI : cloudinaryAPI,
})