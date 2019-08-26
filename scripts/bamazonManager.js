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
                        var dbTable = new Table({
                            head: ['Item ID', 'Product', 'Department', 'Price', 'Stock Qty'],
                            colWidths: [10, 50, 30, 12, 20]
                        });
                        res.forEach(function(product){
                            dbTable.push([product.item_id, product.product_name, product.department_name, product.price, product.stock_quantity]);
                        });

                        console.log(dbTable.toString() + "\n");
                        that.start(callback);
                    });
                    

    }
  }
};