const postgresClient = require("./dbClient");
const redisClient = require("./redisClient");

module.exports = Object.assign({},{
    postgresClient : postgresClient,
    redisClient : redisClient,
})