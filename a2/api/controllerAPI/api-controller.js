// var crow = require("../crowdfunding_db");
// var express = require('express');
// var router = express.Router();
// var connection = crow.getconnection();

// connection.connect();

// router.get("/", (req, res)=>{
// 	connection.query(`SELECT  
//     FUNDRAISER.FUNDRAISER_ID,  
//     FUNDRAISER.ORGANIZER,  
//     FUNDRAISER.CAPTION,  
//     FUNDRAISER.TARGET_FUNDING,  
//     FUNDRAISER.CURRENT_FUNDING,  
//     FUNDRAISER.CITY,  
//     FUNDRAISER.ACTIVE,  
//     CATEGORY.NAME AS CategoryName  
// FROM   
//     FUNDRAISER  
// INNER JOIN   
//     CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
//     WHERE 
//     FUNDRAISER.ACTIVE=1;`, (err, records,fields)=> {
// 		 if (err){
// 			 console.error("Error while retrieve the data");
// 		 }else{
// 			 res.send(records);
// 		 }
// 	})})

// router.get("/:id", (req, res)=>{
//     connection.query(`SELECT  
//     FUNDRAISER.FUNDRAISER_ID,  
//     FUNDRAISER.ORGANIZER,  
//     FUNDRAISER.CAPTION,  
//     FUNDRAISER.TARGET_FUNDING,  
//     FUNDRAISER.CURRENT_FUNDING,  
//     FUNDRAISER.CITY,  
//     FUNDRAISER.ACTIVE,  
//     CATEGORY.NAME AS CategoryName  
// FROM   
//     FUNDRAISER  
// INNER JOIN   
//     CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID
//     WHERE 
//     FUNDRAISER.ACTIVE=1
//     AND
//     FUNDRAISER.FUNDRAISER_ID=`+ req.params.id, (err, records,fields)=> {
//         if (err){
//             console.error("Error while retrieve the data");
//         }else{
//             res.send(records);
//         }
//     })})

// router.get("/GATEGORY/ALL", (req, res)=>{
//     connection.query(`SELECT * FROM CATEGORY; `, (err, records,fields)=> {
//             if (err){
//                 console.error("Error while retrieve the data");
//             }else{
//                 res.send(records);
//             }
//     })})

//     router.get("/SEARCH/one",(req,res)=>{
//         const organizer = req.query.organizer;
//         const city = req.query.city;
//         const categoryName = req.query.categoryName;
     
//          let query=
//              `SELECT *
//                      FROM FUNDRAISER
//              JOIN 
//              CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID;    
//              WHERE 
//                  f.ACTIVE=1 `;
     
//          let queryParams = [];
//          if(organizer !==''){
//              query +='AND f.ORGANIZER=?';
//              queryParams.push(organizer);
//          }
//          if(city !==''){
//              query +='AND f.CITY=?';
//              queryParams.push(city);
//          }
//          if(categoryName !==''){
//              query +='AND c.NAME=?';
//              queryParams.push(categoryName);
//          }
     
//          connection.query(query,queryParams,(err,records,fields)=>{
//              if(err){
//                  console.error("Error while retrieve the data",err);
//                  res.status(500).send("internal err")
//              }else{
//                  res.send(records);
//              }
//          }
         
//          );
     
//      });
        
//     module.exports = router;


var crow = require("../crowdfunding_db");
var express = require('express');
var router = express.Router();
var connection = crow.getconnection();

connection.connect();

router.get("/", (req, res) => {
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
        if (err) {
            console.error("Error while retrieve the data");
        } else {
            res.send(records);
        }
    });
});

router.get("/:id", (req, res) => {
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
        if (err) {
            console.error("Error while retrieve the data");
        } else {
            res.send(records);
        }
    });
});


router.get("/GATEGORY/ALL", (req, res)=>{
    connection.query(`SELECT * FROM CATEGORY; `, (err, records,fields)=> {
            if (err){
                console.error("Error while retrieve the data");
            }else{
                res.send(records);
            }
    })})

router.get("/SEARCH/one", (req, res) => {
    const organizer = req.query.organizer;
    const city = req.query.city;
    const category = req.query.category;


    let query =
            `SELECT * FROM FUNDRAISER
            JOIN 
                CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID   
            WHERE 
                FUNDRAISER.ACTIVE = 1 `;


    let queryParams = [];
    if (organizer!== '') {
        query += 'AND FUNDRAISER.ORGANIZER =?';
        queryParams.push(organizer);
    }
    if (city!== '') {
        query += 'AND FUNDRAISER.CITY =?';
        queryParams.push(city);
    }
    if (category!== '') {
        query += 'AND CATEGORY.NAME =?';
        queryParams.push(category);
    }

    console.log('Final SQL:', query, queryParams);
    connection.query(query, queryParams, (err, records, fields) => {
        if (err) {
            console.error("Error while retrieve the data", err);
            res.status(500).send("内部错误");
        } else {
            res.send(records);
        }
    });


});


module.exports = router;
