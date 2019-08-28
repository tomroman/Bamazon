let mysql = require('mysql');
let inquirer = require('inquirer');
let Table =  require('cli-table');

let Manager = function(sql) {var Manager = function(sql){
    this.sql = sql;
    this.start = function(callback){
        let that = this;
        let menuChoices = [
            "i) View Current Inventory",
            "l) View Low Inventory",
            "a) Add to Inventory",
            "n) Add New Product",
            "e) Return to Main Menu"
        ];
        inquirer.prompt({
            name: 'menuChoice',
            type: 'list',
            message: 'Welcome Manager what would you like to do?',
            choices:menuChoices
        }).then(function(answer){
            switch(answer.menuChoice.split(")")[0]){
                case 'i':
                    that.sql.query("SELECT * FROM products", function(err, res){
                        if(err) throw err;
                        let dbTable = new Table({
                            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Qty'],
                            colWidths: [10, 50, 30, 12, 20]
                        });
                        res.forEach(function(product){
                            dbTable.push([product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity]);
                        });

                        console.log(dbTable.toString() + "\n");
                        that.start(callback);
                    });
                    break;
                case 'l' :
                    console.log("Viewing Low Inventory...");
                    that.sql.query("SELECT * FROM products WHERE stock_quantity < 5", function(err, res){
                        if(err) throw err;
                        let dbTable = new Table({
                            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Qty'],
                            colWidths: [10, 50, 30, 12, 20]
                        });
                        res.forEach(function(product){
                            dbTable.push([product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity]);
                        });

                        console.log(dbTable.toString() + "\n");
                        that.start(callback);
                    });
                    break;
                    case 'a':
                        inquirer.prompt([
                            {
                                name:"itemId",
                                type:"input",
                                message: "Which product would you like to order more stock for? (Please enter ID#)",
                                validate: function(value){
                                    var itemId = value.match(/^[0-9]+$/);
                                    if(itemId){
                                        return true;
                                    }
                                    return 'Please enter a valid ID#';
                                }
                            },
                            {
                                name:"stockQty",
                                type:"input",
                                message:"How much should we order?",
                                validate: function(value){
                                    var stock = value.match(/^[0-9]+$/);
                                    if(stock){
                                        return true;
                                    }
                                    return 'Please enter an amount.';
                                }
                                
                            }
                        ]).then(function(answer){
                            that.sql.query("SELECT * FROM products WHERE ?", { item_id: parseInt(answer.itemId) }, 
                            function(err, res){
                                that.sql.query("UPDATE products SET ? WHERE ?",[{
                                    stock_quantity: (res[0].stock_quantity + parseInt(answer.stockQty))
                                },{
                                    item_id: parseInt(answer.itemId)
                                }], function(err, res){
                                    if(err) throw err;
                                    console.log(res.affectedRows + " item(s) have been updated.\n");
                                    that.start(callback);
                                });
                            });
                        });

                    break;


    }
  }
};