// Declare a constant for userImageLabel the CRUD Postgres table
const tableName = "userImageLabel";

// Declare a string for the CREATE TABLE SQL statement for userImageLabel
const userImageLabelTable = `CREATE TABLE ${tableName} (
userId INTEGER NOT NULL,
imageId INTEGER NOT NULL,
label VARCHAR(20) NOT NULL,
PRIMARY KEY (userId, imageId)
);`;

module.exports = userImageLabelTable;