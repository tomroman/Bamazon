let mysql = require('mysql');
let inquirer = require('inquirer');
let Table = require('cli-table');

let Supervisor = function(sql) {
    this.sql = sql;
    this.start = function (callback) {
        let that = this;

        let menuChoices = [console(log)];
    }
};

module.exports = Supervisor