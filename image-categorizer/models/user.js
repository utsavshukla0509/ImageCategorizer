// Declare a constant for user the CRUD Postgres table
const tableName = "userInfo";

// Declare a string for the CREATE TABLE SQL statement for user
const userTable = `CREATE TABLE ${tableName} (
userId SERIAL PRIMARY KEY,
username VARCHAR(50) NOT NULL,
email VARCHAR(255) UNIQUE NOT NULL,
password VARCHAR(255) NOT NULL
);`;

module.exports = userTable;