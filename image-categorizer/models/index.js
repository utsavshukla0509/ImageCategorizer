const userTable = require("../models/user");
const userImageTable = require("../models/userImage");
const userImageLabelTable = require("../models/userImageLabel");
const { Client } = require('pg');
require('dotenv').config();



const client = new Client({
    user : "postgres",
    password : "utsav",
    host : "localhost",
    port : 5432,
    database : "ImgCat"
});

async function execute(){
    try{
        await client.connect();
        console.log("DB is connected successfully");   
    }
    catch(err){
        console.log(err)
    } 
}

async function initialiseTables(){

    let promises = [];
    try{
        promises.push(
            client.query(userTable).then((info)=>{
                // console.log(info);
            }).catch((err)=>{
                console.log(err);
            })
        );

        promises.push(
            client.query(userImageTable).then((info)=>{
                // console.log(info);
            }).catch((err)=>{
                console.log(err);
            })
        );

        promises.push(
            client.query(userImageLabelTable).then((info)=>{
                // console.log(info);
            }).catch((err)=>{
                console.log(err);
            })
        );

        await Promise.all(promises);
    }
    catch(err){
        console.log(err);
    }
}


async function initDBAndTables(){
    let promises = [];
    promises.push(execute());
    promises.push(initialiseTables());

    await Promise.all(promises);
}




module.exports = {
    initDBAndTables : initDBAndTables,
    execute : execute
}