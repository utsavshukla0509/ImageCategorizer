const { Client } = require('pg');

const postgresClient = new Client({
    user : "postgres",
    password : "utsav",
    host : "localhost",
    port : 5432,
    database : "ImgCat"
});

postgresClient.connect();

module.exports = postgresClient;