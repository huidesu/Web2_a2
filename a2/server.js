// 引入express模块，express是一个快速、无约束、极简的web开发框架，用于构建API和web应用程序  
var express = require('express');  
  
// 使用express模块创建一个应用实例  
var app = express();  
  
// 引入cors模块，cors是一个Node.js中间件，用于启用CORS（跨源资源共享）以允许来自不同源的请求  
var cors = require('cors')  
  
// 引入一个自定义的API控制器模块，这个模块可能包含处理特定路由（如资金相关API）的逻辑  
var fundAPI = require("./api/controllerAPI/api-controller");  
  
// 使用cors中间件，允许所有来源的跨域请求  
app.use(cors());   
  
// 将/api/funding路由的所有请求代理给fundAPI模块处理  
// 这意味着当请求到达/api/funding路径时，将由fundAPI模块中的路由处理函数来处理这些请求  
app.use("/api/funding", fundAPI);  
  
// 监听3060端口，等待进入的连接  
app.listen(3060);  
  
// 在控制台打印信息，表明服务器已经在3060端口启动并运行  
console.log("Server up and running on port 3060");
/**这段代码是一个简单的Node.js服务器应用，使用了Express框架来设置路由和处理HTTP请求。通过引入CORS中间件，
 * 它允许来自不同源的跨域请求，这在开发阶段或允许来自不同域名的前端应用访问后端API时非常有用。此外，
 * 它还引入了一个自定义的API控制器模块，该模块可能包含用于处理特定API请求（如与资金相关的操作）的逻辑。
 * 最后，服务器监听3060端口，并打印一条消息到控制台，表明服务器已经启动并准备好接收请求。 */