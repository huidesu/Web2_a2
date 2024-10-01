// Import the db - details module, which should export an object containing database connection details.
var dbDetails = require("./db-details");

// Import the mysql2 module, which is used to create database connections and perform database operations.
var mysql = require('mysql2');

// Import the body - parser module. Although it is not directly used in this code, it is usually used to parse HTTP request bodies.
// (For example, parsing JSON or URL - encoded data in a POST request)
var bodyParser = require('body-parser');

// Import the http module. Although it is not directly used in this code, it can be used to create an HTTP server or handle network requests.
var http = require('http');

// Export an object that contains a function named getconnection.
module.exports = {
    // The getconnection function is used to create and return a database connection.
    getconnection: () => {
        // Use the mysql.createConnection method to create a new database connection.
        // Pass a configuration object that contains the database connection details loaded from the dbDetails module.
        return mysql.createConnection({
            host: dbDetails.host,
            user: dbDetails.user,
            password: dbDetails.password,
            database: dbDetails.database
        });
    }
};
