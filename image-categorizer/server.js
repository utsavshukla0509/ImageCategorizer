const cors = require("cors");
const express = require("express");
const bodyParser = require("body-parser");
const init = require("./models/index");
require('dotenv').config();

const app = express();
const port = process.env.PORT || 8000;

//Initialise DB and Tables
//init.initDBAndTables();
init.execute();

app.use(cors());
app.use(express.json());


app.use(bodyParser.json({ limit: "10mb" }));
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

