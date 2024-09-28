var express = require('express');
var app = express();
var fundAPI = require("./api/controllerAPI/api-controller");

app.use("/api/funding", fundAPI);
app.listen(3060);
console.log("Server up and running on port 3060");