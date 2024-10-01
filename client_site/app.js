// 引入Express框架，这是一个用于构建Web应用程序的Node.js框架
const express = require("express");
// 引入body - parser中间件，用于解析URL - encoded和JSON格式的数据
const bodyParser = require("body-parser");
// 引入path模块，用于处理文件和目录的路径
const path = require("path");

// 创建一个Express应用实例
const app = express();

// 使用body - parser中间件来解析扩展格式（extended:true）的URL - encoded数据和JSON数据
// 这使得在处理POST请求时，可以方便地获取请求体中的数据
app.use(bodyParser.urlencoded({extended:true}));
// 这一行配置应用程序使用body - parser来解析JSON数据
// 这样在处理包含JSON数据的请求时，可以直接获取解析后的JavaScript对象
app.use(bodyParser.json());

// 将当前目录（__dirname）设置为静态资源目录
// 这意味着可以直接从该目录下提供静态文件（如HTML、CSS、JavaScript文件等）
app.use(express.static(__dirname));

// 定义一个GET请求的路由处理函数，当访问根路径'/'时被调用
// 这个函数的作用是发送根目录下的'Home.html'文件作为响应
app.get("/",(req,res)=>{
    res.sendFile(path.join(__dirname,"./Home.html"));
});

// 定义一个GET请求的路由处理函数，当访问'/search'路径时被调用
// 这个函数的作用是发送根目录下的'search.html'文件作为响应
app.get("/search",(req,res)=>{
    res.sendFile(path.join(__dirname,"./search.html"));
});

// 定义一个GET请求的路由处理函数，当访问'/fundraiser'路径时被调用
// 这个函数的作用是发送根目录下的'fundraiser.html'文件作为响应
app.get("/fundraiser",(req,res)=>{
    res.sendFile(path.join(__dirname,"./fundraiser.html"));
});

// 让应用程序监听在8080端口上
// 当服务器成功启动并监听在该端口时，会在控制台打印'opening 8080'
app.listen(8080,()=>{
    console.log("opening 8080");
});
/**首先引入了express框架、body - parser中间件（用于解析请求数据）和path模块（用于处理文件路径）。
创建了一个express应用实例app。
配置body - parser中间件来处理不同格式的数据，以便在后续的路由处理中能够方便地获取请求中的数据。
将当前目录设置为静态资源目录，使得可以直接从该目录下提供静态文件。
定义了三个路由处理函数，分别对应根路径'/'、'/search'和'/fundraiser'，每个函数都会发送对应的 HTML 文件作为响应。
最后让应用程序监听在8080端口上，当成功监听时在控制台打印相应信息。 */