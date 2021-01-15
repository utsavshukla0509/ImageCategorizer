const redis = require('ioredis');

const redisClient = redis();

module.exports = redisClient;