var mysql = require("mysql");
var inqiurer = require("inquirer");
var Table = require("cli-table");
var connection = mysql.createConnection({

    host: "localhost", 

    port: 8889, 

    user: "root",
    password: "root",
    database: "bamazon_db"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");

    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        console.log(result);
      });
    });
  

