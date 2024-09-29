const express = require("express");    
const bodyParser = require("body-parser");
const path = require("path");

const app = express();  

app.use(bodyParser.urlencoded({extended:true}));  //to parse URL-encoded & JSON data 
app.use(bodyParser.json());

app.use(express.static(__dirname));  

app.get("/",(req,res)=>{   
    res.sendFile(path.join(__dirname,"./Home.html"));
});

 app.get("/search",(req,res)=>{   
     res.sendFile(path.join(__dirname,"./search.html"));
 });

 app.get("/fundraiser",(req,res)=>{   
     res.sendFile(path.join(__dirname,"./fundraiser.html"));
 });

app.listen(8080,()=>{
    console.log("opening 8080");
});