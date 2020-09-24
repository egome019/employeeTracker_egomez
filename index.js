const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")

const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "Soccer115!",
    database: "workPlace_DB"
});

connection.connect((err) => {
    if (err) throw err;
    console.log(`connected as id ${connection.threadId}`);

    init();
});
// initiates prompts
const init = () => {
    inquirer.prompt({
        name: "action",
        type: "list",
        message: "What would you like to do?",
        choices: [
            "View All Employees",
            "View All Employees By Department",
            "View All Employees By Manager",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Update Employee Manager",
            "View All Roles",
            "Add Roles",
            "Remove Roles"
        ]
    })
    .then((answer) => {
        switch (answer.action) {
            case "View All Employees":
                viewAllEmp()
                break;
            case "View All Employees By Department":
                viewAllEmpDept()
                break;
            case "View All Employees By Manager":
                // view all query...
                break;
            case "Add Employee":
                // view all query...
                break;
            case "Remove Employee":
                // view all query...
                break;
            case "Update Employee Role":
                // view all query...
                break;
            case "Update Employee Manager":
                // view all query...
                break;
            case "View All Roles":
                // view all query...
                break;
            case "Add Roles":
                // view all query...
                break;
            case "Remove Roles":
                // view all query...
                break;
        }
    });
}
// view all employees data
const viewAllEmp = () => {
    connection.query("select * from employee", (err, res) => {
        if (err) throw err;
        // console.log(res)
        console.table(res)
    })
}

const viewAllEmpDept = () => {
    const query = "select * from employee inner join empRole on (employee.role_id = empRole.id) order by empRole.dept_id"

    connection.query(query, (err, res) => {
        if (err) throw err;
        // console.log(res)
        console.table(res)
    })
}