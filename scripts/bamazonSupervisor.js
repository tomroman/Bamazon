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
        })
    }
};

module.exports = Supervisor