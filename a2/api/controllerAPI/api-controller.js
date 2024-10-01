// 引入自定义的模块 '../crowdfunding_db'，这个模块可能包含了数据库连接相关的功能
// 将其导出的内容赋值给变量 'crow'
var crow = require("../crowdfunding_db");
// 引入Express框架，用于构建Web应用程序
// 将Express框架的实例赋值给变量 'express'
var express = require('express');
// 使用Express框架创建一个路由器对象，用于处理特定的路由
// 将路由器对象赋值给变量 'router'
var router = express.Router();
// 通过调用 'crow' 模块中的 'getconnection' 方法获取数据库连接对象
// 将数据库连接对象赋值给变量 'connection'
var connection = crow.getconnection();

// 调用数据库连接对象的 'connect' 方法，建立与数据库的连接
connection.connect();

// 定义一个GET请求的路由处理函数，当访问根路径 '/' 时被调用
router.get("/", (req, res) => {
    // 使用数据库连接对象的 'query' 方法执行一个SQL查询语句
    // 查询从 'FUNDRAISER' 表和 'CATEGORY' 表中获取特定列的数据，通过内连接（INNER JOIN）关联两个表
    // 并且只获取 'ACTIVE' 为1（表示活跃）的筹款者（FUNDRAISER）记录
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
        // 如果查询过程中出现错误，将错误信息打印到控制台
        if (err) {
            console.error("Error while retrieve the data");
        } else {
            // 如果查询成功，将查询结果（'records'）发送给客户端作为响应
            res.send(records);
        }
    });
});

// 定义一个GET请求的路由处理函数，当访问路径包含一个动态参数 ':id' 时被调用
// 例如，访问 '/1'，其中 '1' 就是动态参数 ':id' 的值
router.get("/:id", (req, res) => {
    // 使用数据库连接对象的 'query' 方法执行一个SQL查询语句
    // 与前面的查询类似，但添加了一个额外的条件，即 'FUNDRAISER.FUNDRAISER_ID' 等于请求路径中的动态参数 'id'
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
        // 如果查询过程中出现错误，将错误信息打印到控制台
        if (err) {
            console.error("Error while retrieve the data");
        } else {
            // 如果查询成功，将查询结果（'records'）发送给客户端作为响应
            res.send(records);
        }
    });
});


// 定义一个GET请求的路由处理函数，当访问路径 '/GATEGORY/ALL' 时被调用
router.get("/GATEGORY/ALL", (req, res) => {
    // 使用数据库连接对象的 'query' 方法执行一个SQL查询语句，查询 'CATEGORY' 表中的所有数据
    connection.query(`SELECT * FROM CATEGORY; `, (err, records, fields) => {
        // 如果查询过程中出现错误，将错误信息打印到控制台
        if (err) {
            console.error("Error while retrieve the data");
        } else {
            // 如果查询成功，将查询结果（'records'）发送给客户端作为响应
            res.send(records);
        }
    });
});

// 定义一个GET请求的路由处理函数，当访问路径 '/SEARCH/one' 时被调用
router.get("/SEARCH/one", (req, res) => {
    // 从请求的查询参数（query parameters）中获取 'organizer'（组织者）的值
    const organizer = req.query.organizer;
    // 从请求的查询参数中获取 'city'（城市）的值
    const city = req.query.city;
    // 从请求的查询参数中获取 'category'（类别）的值
    const category = req.query.category;


    // 构建一个初始的SQL查询语句，从 'FUNDRAISER' 表和 'CATEGORY' 表中获取数据并通过内连接关联两个表
    // 并且只获取 'ACTIVE' 为1（表示活跃）的筹款者记录
    let query =
            `SELECT * FROM FUNDRAISER
            JOIN 
                CATEGORY ON FUNDRAISER.CATEGORY_ID = CATEGORY.CATEGORY_ID   
            WHERE 
                FUNDRAISER.ACTIVE = 1 `;


    // 创建一个空数组，用于存储后续动态添加到查询语句中的参数值
    let queryParams = [];
    // 如果 'organizer' 的值不为空字符串，将一个条件添加到查询语句中，并将 'organizer' 的值添加到参数数组中
    if (organizer!== '') {
        query += 'AND FUNDRAISER.ORGANIZER =?';
        queryParams.push(organizer);
    }
    // 如果 'city' 的值不为空字符串，将一个条件添加到查询语句中，并将 'city' 的值添加到参数数组中
    if (city!== '') {
        query += 'AND FUNDRAISER.CITY =?';
        queryParams.push(city);
    }
    // 如果 'category' 的值不为空字符串，将一个条件添加到查询语句中，并将 'category' 的值添加到参数数组中
    if (category!== '') {
        query += 'AND CATEGORY.NAME =?';
        queryParams.push(category);
    }

    // 在控制台打印最终的SQL查询语句和参数数组（用于调试目的）
    console.log('Final SQL:', query, queryParams);
    // 使用数据库连接对象的 'query' 方法执行构建好的查询语句，并传入参数数组
    connection.query(query, queryParams, (err, records, fields) => {
        // 如果查询过程中出现错误，将错误信息打印到控制台，并发送一个500状态码和错误消息（这里是"内部错误"）给客户端
        if (err) {
            console.error("Error while retrieve the data", err);
            res.status(500).send("内部错误");
        } else {
            // 如果查询成功，将查询结果（'records'）发送给客户端作为响应
            res.send(records);
        }
    });


});


// 将定义好的路由器对象（'router'）作为模块的导出内容
// 这样其他模块就可以引入这个模块并使用这个路由器来处理特定的路由请求
module.exports = router;
