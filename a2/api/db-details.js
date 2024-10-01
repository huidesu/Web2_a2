// 使用module.exports语法导出配置对象，使得其他文件可以通过require引入这个配置对象  
module.exports = {  
    // 数据库服务器的主机名或IP地址。这里设置为"localhost"，意味着数据库服务器运行在本地计算机上  
    host: "localhost",  
      
    // 数据库用户名。这里设置为"root"，通常是MySQL等数据库的默认管理员账户  
    user: "root",  
      
    // 数据库密码。这里设置为"123456"，实际使用时应该设置为一个强密码以保证安全  
    password: "123456",  
      
    // 要连接的数据库名称。这里设置为"crowdfunding_db"，意味着将连接到名为"crowdfunding_db"的数据库  
    database : "crowdfunding_db"  
};
/**这段代码通常用于后端开发中，特别是在使用Node.js和数据库（如MySQL、PostgreSQL等）进行交互时。通过配置这些信息，开发者可以轻松地连接到指定的数据库，执行查询、更新等操作。 */