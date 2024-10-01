// Import the custom module '../crowdfunding_db', which may contain functions related to database connection
// Assign the exported content of the module to the variable 'crow'
var crow = require("../crowdfunding_db");
// Import the Express framework, which is used to build web applications
// Assign the instance of the Express framework to the variable 'express'
var express = require('express');
// Use the Express framework to create a router object for handling specific routes
// Assign the router object to the variable 'router'
var router = express.Router();
// Obtain the database connection object by calling the 'getconnection' method in the 'crow' module
// Assign the database connection object to the variable 'connection'
var connection = crow.getconnection();

// Call the 'connect' method of the database connection object to establish a connection with the database
connection.connect();

// Define a route handling function for GET requests. This function will be called when the root path '/' is accessed.
router.get("/", (req, res) => {
    // Use the 'query' method of the database connection object to execute an SQL query statement.
    // Query to obtain specific columns of data from the 'FUNDRAISER' table and the 'CATEGORY' table, and associate the two tables through an inner join (INNER JOIN).
    // Only retrieve fundraiser (FUNDRAISER) records where 'ACTIVE' is 1 (indicating active).
    connection.query(`SELECT  
    FUNDRAISER.FUNDRAISER_ID,  
    FUNDRAISER.ORGANIZER,  
    FUNDRAISER.CAPTION,  
    FUNDRAISER.TARGET_FUNDING,  
    FUNDRAISER.CURRENT_FUNDING,  
    FUNDRAISER.CITY,  
    FUNDRAISER.ACTIVE,  
    CATEGORY.NAME AS CategoryName  
FROM   
    FUNDRAISER  
INNER JOIN   
    CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
    WHERE 
    FUNDRAISER.ACTIVE = 1;`, (err, records, fields) => {
        // If an error occurs during the query process, print the error message to the console.
        if (err) {
            console.error("Error while retrieving the data");
        } else {
            // If the query is successful, send the query results ('records') as a response to the client.
            res.send(records);
        }
    });
});

// Define a route handling function for GET requests. This function will be called when a path with a dynamic parameter ':id' is accessed.
// For example, when accessing '/1', '1' is the value of the dynamic parameter ':id'.
router.get("/:id", (req, res) => {
    // Use the 'query' method of the database connection object to execute an SQL query statement.
    // Similar to the previous query, but with an additional condition that 'FUNDRAISER.FUNDRAISER_ID' is equal to the dynamic parameter 'id' in the request path.
    connection.query(`SELECT  
    FUNDRAISER.FUNDRAISER_ID,  
    FUNDRAISER.ORGANIZER,  
    FUNDRAISER.CAPTION,  
    FUNDRAISER.TARGET_FUNDING,  
    FUNDRAISER.CURRENT_FUNDING,  
    FUNDRAISER.CITY,  
    FUNDRAISER.ACTIVE,  
    CATEGORY.NAME AS CategoryName  
FROM   
    FUNDRAISER  
INNER JOIN   
    CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
    WHERE 
    FUNDRAISER.ACTIVE = 1
    AND
    FUNDRAISER.FUNDRAISER_ID = ` + req.params.id, (err, records, fields) => {
        // If an error occurs during the query process, print the error message to the console.
        if (err) {
            console.error("Error while retrieving the data");
        } else {
            // If the query is successful, send the query results ('records') as a response to the client.
            res.send(records);
        }
    });
});


// Define a route handling function for GET requests. This function will be called when the path '/GATEGORY/ALL' is accessed.
router.get("/GATEGORY/ALL", (req, res) => {
    // Use the 'query' method of the database connection object to execute an SQL query statement to query all data in the 'CATEGORY' table.
    connection.query(`SELECT * FROM CATEGORY; `, (err, records, fields) => {
        // If an error occurs during the query process, print the error message to the console.
        if (err) {
            console.error("Error while retrieving the data");
        } else {
            // If the query is successful, send the query results ('records') as a response to the client.
            res.send(records);
        }
    });
});

// Define a route handling function for GET requests. This function will be called when the path '/SEARCH/one' is accessed.
router.get("/SEARCH/one", (req, res) => {
    // Obtain the value of 'organizer' (organizer) from the query parameters of the request.
    const organizer = req.query.organizer;
    // Obtain the value of 'city' (city) from the query parameters of the request.
    const city = req.query.city;
    // Obtain the value of 'category' (category) from the query parameters of the request.
    const category = req.query.category;


    // Build an initial SQL query statement to obtain data from the 'FUNDRAISER' table and the 'CATEGORY' table and associate the two tables through an inner join.
    // Only retrieve active fundraiser records where 'ACTIVE' is 1.
    let query =
            `SELECT * FROM FUNDRAISER
            JOIN 
                CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID   
            WHERE 
                FUNDRAISER.ACTIVE = 1 `;


    // Create an empty array to store parameter values that will be dynamically added to the query statement later.
    let queryParams = [];
    // If the value of 'organizer' is not an empty string, add a condition to the query statement and add the value of 'organizer' to the parameter array.
    if (organizer!== '') {
        query += 'AND FUNDRAISER.ORGANIZER =?';
        queryParams.push(organizer);
    }
    // If the value of 'city' is not an empty string, add a condition to the query statement and add the value of 'city' to the parameter array.
    if (city!== '') {
        query += 'AND FUNDRAISER.CITY =?';
        queryParams.push(city);
    }
    // If the value of 'category' is not an empty string, add a condition to the query statement and add the value of 'category' to the parameter array.
    if (category!== '') {
        query += 'AND CATEGORY.NAME =?';
        queryParams.push(category);
    }

    // Print the final SQL query statement and parameter array to the console (for debugging purposes).
    console.log('Final SQL:', query, queryParams);
    // Use the 'query' method of the database connection object to execute the constructed query statement and pass in the parameter array.
    connection.query(query, queryParams, (err, records, fields) => {
        // If an error occurs during the query process, print the error message to the console and send a 500 status code and an error message (here is "Internal error") to the client.
        if (err) {
            console.error("Error while retrieving the data", err);
            res.status(500).send("Internal error");
        } else {
            // If the query is successful, send the query results ('records') as a response to the client.
            res.send(records);
        }
    });


});


// Export the defined router object ('router') as the content of this module.
// In this way, other modules can import this module and use this router to handle specific route requests.
module.exports = router;
