// Import the Express framework, which is a Node.js framework used for building web applications.
const express = require("express");
// Import the body - parser middleware, which is used to parse URL - encoded and JSON - formatted data.
const bodyParser = require("body-parser");
// Import the path module, which is used to handle paths of files and directories.
const path = require("path");

const app = express();

// Use the body - parser middleware to parse URL - encoded data with extended format (extended: true) and JSON data.
// This makes it convenient to obtain the data in the request body when handling POST requests.
app.use(bodyParser.urlencoded({ extended: true }));
// This line configures the application to use body - parser to parse JSON data.
// So when handling requests containing JSON data, the parsed JavaScript object can be directly obtained.
app.use(bodyParser.json());

// Set the current directory (__dirname) as the static resource directory.
// This means that static files (such as HTML, CSS, JavaScript files, etc.) can be directly served from this directory.
app.use(express.static(__dirname));

// Define a route handling function for GET requests. This function will be called when the root path '/' is accessed.
// The function's role is to send the 'Home.html' file in the root directory as a response.
app.get("/", (req, res) => {
    res.sendFile(path.join(__dirname, "./Home.html"));
});

app.get("/search", (req, res) => {
    res.sendFile(path.join(__dirname, "./search.html"));
});

app.get("/fundraiser", (req, res) => {
    res.sendFile(path.join(__dirname, "./fundraiser.html"));
});


app.listen(8080, () => {
    console.log("opening 8080");
});
