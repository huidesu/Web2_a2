var express = require('express');
var app = express();
var cors = require('cors')
var fundAPI = require("./api/controllerAPI/api-controller");

app.use(cors()); 
app.use("/api/funding", fundAPI);
app.listen(3060);
console.log("Server up and running on port 3060");