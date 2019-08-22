let mysql = require('mysql');
let inquirer = require('inquirer');
let Table = require('cli-table');

let Supervisor = function(sql) {
    this.sql = sql;
    this.start = function (callback) {
        let that = this;

        let menuChoices = [   
        "v) View Product Sales by Department",
        "n) Add New Department",
        "e) Return to Main Menu"];

        inquirer.prompt({
            name: 'menuChoice',
            type: 'list',
            message: 'Welcome Supervisor what would you like to do?',
            choices:menuChoices
        }).then(function(answer){
            switch(answer.menuChoice.split(")")[0]){
                case 'v':
                    let deptQuery = "SELECT departments.department_id, products.department_name,  departments.over_head_cost, SUM( products.product_sales) AS product_sales, SUM( products.product_sales) - (departments.over_head_cost) AS total_profit FROM products INNER JOIN departments ON products.department_name = departments.department_name GROUP BY  departments.department_name order by departments.department_id"
                    that.sql.query(deptQuery, function(err, res){
                        if(err) throw err;
                        let dbTable = new Table({
                            head: ['Department ID', 'Department Name', 'Over Head Cost', 'Product Sales', 'Total Profit'],
                            colWidths: [10, 40, 20, 20, 20]
                        });
                        res.forEach(function(department){
                            dbTable.push([department.department_id, department.department_name, department.over_head_cost, department.product_sales, department.total_profit]);
                        });

                        console.log(dbTable.toString() + "\n");
                        that.start(callback);
                    });
                
        }
      });
    }
}

module.exports = Supervisor