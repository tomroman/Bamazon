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
    }
  }
};