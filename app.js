let inquirer = require('inquirer');
let mysql = require('mysql');
let Customer = require('./scripts/bamazonCustomer.js');
let Manager = require('./scripts/bamazonManager.js');
let Supervisor = require('./scripts/bamazonSupervisor.js');
let databaseKey = require('./database_key.js');

let connection = mysql.createConnection(databaseKey);

let runp = true;
let runPChoices = [
    'Customer: Order a product',
    new inquirer.Separator(),
    'Manager: Management Panel',
    'Supervisor: Supervisor Panel',
    "Exit: Leave Bamazon."
];

let managerPass = "Bamazon2019";
let supervisorPass = "BamazonSuper2019";

function loadCommand (command) {
    switch(command) {
        case "Customer":
            let newCustomer = newCustomer(connection);
            newCustomer.start(runProgram);
            break;
        case "Manager":
            checkPassword();
            break;
        case "Supervisor":
            checkPassword();
            break;
        case "Exit":
            runProgram(false);
            break;
        default:
            console.log("something went wrong. Command: " + command);
            runProgram(false);
            break;


    }
}
function checkPassword(){
    inquirer.prompt({
        name: 'manPass',
        type: 'input',
        message: 'Please enter Your Password: (You can type exit to go back to the main menu)' 
     }).then(function(answer){
         if(answer.manPass === 'exit'){
             runProgram(true);
         } else if(answer.manPass === managerPass){
             let newManager = new Manager(connection);
             newManager.start(runProgram);
         } else if(answer.manPass === supervisorPass){
            let newSupervisor = new Supervisor(connection);
            newSupervisor.start(runProgram);
        } else {
             console.log("Sorry wrong password!");
             checkPassword();
         }
     });
}
function runProgram(run){
    if(run){
        console.log('\x1Bc');
        var message =   
                '============================== \n' +
                '  =      Welcome to Bamazon    = \n' +
                '  = What would you like to do? = \n' +
                '  ============================== \n';

        inquirer
        .prompt([
          {
            type: 'list',
            name: 'choice',
            message: message,
            choices: runPChoices
          }
        ])
        .then(answers => {
          loadCommand(answers.choice.split(":")[0]);
        });
    } else {
        console.log( "\nThanks for using Bamazon! Exiting Program...\n");
        connection.end();
        process.exit();
    } 
    
}

connection.connect(function(err){
    if(err) throw err;
    runProgram(runP);
});
