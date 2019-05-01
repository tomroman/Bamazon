var mysql = require("mysql");
var inquirer = require("inquirer");
var Table = require("cli-table");

var connection = mysql.createConnection({

    host: "localhost", 

    port: 8889, 

    user: "root",
    password: "",
    database: "bamazon_db"

});

connection.connect(function(err) {
    if (err) throw err;
    console.log("connected as id " + connection.threadId + "\n");
    });

function displayInventory () {
    console.log("Select a product");

    connection.query("SELECT * FROM products", function (err, result, fields) {
        if (err) throw err;
        
	var table = new Table({
        head: ["item_id", "product_name", "price"],
        colWidths: [10,15,15]
		
	});

	
	for(var i = 0; i < result.length; i++){
		table.push(
            [result[i].item_id, 
            result[i].product_name, 
            result[i].price]
		);
	}
	console.log(table.toString());

	
});
}

displayInventory();

function selectProduct() {

    connection.query("SELECT * FROM products;", function(err, result, fields) {


        if (err) throw err; 
        inquirer 
            .prompt([
                {
                    type: "input", 
                    message: "Choose product by item id", 
                    name: "id"


                }, 
                {
                    type: "input",
                    message: "How many would you like to purchase?", 
                    name: "quantity"

                }
            ])
            .then(answer => {
                checkStock(answers.id, answers.quantity);

        
            });
        });
};


selectProduct();
function stockQuery (id, quantity) {
    var query = "SELECT stock_quantity FROM products WHERE item_id=" + id + ";";
    connection.query(query, function(err, result) {

        if (err) throw error; 
 
        if (quantity <= response[0].stock_quantity) {

            var newQuantity = response[0].stock_quantity - quantity;
            
            connection.query("UPDATE products SET ? WHERE item_id=" + id, [

                {
                    stock_quantity: newQuantity
                },
                {
                    id: id

                }
            ]);
            newPrice(id, quantity);
            
        } else { 
            console.log(
                "Out of stock"
            ); 


        }
    });
}





 