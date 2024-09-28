var crow = require("../crowdfunding_db");
var express = require('express');
var router = express.Router();
var connection = crow.getconnection();

connection.connect();

router.get("/", (req, res)=>{
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
    FUNDRAISER.ACTIVE=1;`, (err, records,fields)=> {
		 if (err){
			 console.error("Error while retrieve the data");
		 }else{
			 res.send(records);
		 }
	})})

router.get("/:id", (req, res)=>{
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
    FUNDRAISER.ACTIVE=1
    AND
    FUNDRAISER.FUNDRAISER_ID=`+ req.params.id, (err, records,fields)=> {
        if (err){
            console.error("Error while retrieve the data");
        }else{
            res.send(records);
        }
    })})

router.get("/GATEGORY/ALL", (req, res)=>{
    connection.query(`SELECT * FROM CATEGORY; `, (err, records,fields)=> {
            if (err){
                console.error("Error while retrieve the data");
            }else{
                res.send(records);
            }
    })})

    module.exports = router;