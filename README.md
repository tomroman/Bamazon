# Bamazon CLI

Bamazon-CLI is a node command line interface that interacts with the Bamazon SQL Database. It allows the users to view and purchase items from the inventory. It allows Managers to edit and manage the products in the Bamazon database. Lastly it allows Supervisors to view departments and sales data for reports.

#Views

Bamazon - CLI has a main menu that will take you to the three views based on the current user "Customer", "Manager", and "Supervisor". Each view is unique to each type of user and some are locked out from normal use view passwords.

Customer - In the Customer View you can Order items from the Bamazon Store.

Manager - In the Manager View you can View the Current Inventory, Check Low Inventory Stock, Add Inventory Stock, or Add New Inventory.

Supervisor - In the Supervisor View you can View Product Sales Reports and Department Information, or Add New Departments for Inventory Use.

Exit - Allows you to exit the application.

#Customer

The Customer View is where customers order from Bamazon. It will ask which item they wish to purchase and how many they would like to buy. After that it will check the current inventory to see if the item is in stock and place the order for the user if it is.

Customer View - Lets the user scroll through available products to select one to purchase or e) to return to the main menu;

Customer Order - Once user selects an item they will be prompted how many they would like to purchase and the app will check the current stock. If there is stock available their order will go through.