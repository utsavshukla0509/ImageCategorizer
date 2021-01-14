// Declare a constant for userImage the CRUD Postgres table
const tableName = "userImage";

// Declare a string for the CREATE TABLE SQL statement for userImage
const userImageTable = `CREATE TABLE ${tableName} (
userId INTEGER NOT NULL,
imageId SERIAL PRIMARY KEY,
image VARCHAR(255) NOT NULL
);`;

module.exports = userImageTable;