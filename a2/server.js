// Import the express module. Express is a fast, unopinionated, minimalist web - development framework for building APIs and web applications.
var express = require('express');

// Use the express module to create an application instance.
var app = express();

// Import the cors module. Cors is a Node.js middleware used to enable CORS (Cross - Origin Resource Sharing) to allow requests from different origins.
var cors = require('cors');

// Import a custom API controller module. This module may contain the logic for handling specific routes (such as API related to funds).
var fundAPI = require("./api/controllerAPI/api-controller");

// Use the cors middleware to allow cross - origin requests from all sources.
app.use(cors());

// Proxy all requests for the /api/funding route to the fundAPI module for processing.
// This means that when a request reaches the /api/funding path, it will be handled by the route handling functions in the fundAPI module.
app.use("/api/funding", fundAPI);

// Listen on port 3060, waiting for incoming connections.
app.listen(3060);

// Print a message in the console indicating that the server has started and is running on port 3060.
console.log("Server up and running on port 3060");
