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
            "Remove Roles",
            "Exit"
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
                viewAllMan()
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
            case "Exit":
                connection.end()
                break;
        }
    });
}
// view all employees data
const viewAllEmp = () => {
    const query = `SELECT e.id, e.first_name AS "First Name" , e.last_name AS "Last Name", title AS "Title", dept_name AS "Department", salary, CONCAT(e2.first_name, " ", e2.last_name) AS Manager
    FROM employee e
    INNER JOIN empRole ON e.role_id = empRole.id
    INNER JOIN department ON dept_id = department.id
    LEFT JOIN employee e2 ON e2.role_id = e.manager_id
    ORDER BY e.first_name ASC`;
    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("--------------")
        console.table(res)
    })
    init()
}

const viewAllEmpDept = () => {
    const query = `SELECT e.id, e.first_name AS "First Name" , e.last_name AS "Last Name", title AS "Title", dept_name AS "Department", salary, CONCAT(e2.first_name, " ", e2.last_name) AS Manager
    FROM employee e
    INNER JOIN empRole ON e.role_id = empRole.id
    INNER JOIN department ON dept_id = department.id
    LEFT JOIN employee e2 ON e2.role_id = e.manager_id
    ORDER BY dept_id ASC`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------")
        console.table(res)
    })
    init()
}

const viewAllMan = () => {
    const query = `SELECT e.id, e.first_name AS "First Name" , e.last_name AS "Last Name", title AS "Title", dept_name AS "Department", salary, CONCAT(e2.first_name, " ", e2.last_name) AS Manager
    FROM employee e
    INNER JOIN empRole ON e.role_id = empRole.id
    INNER JOIN department ON dept_id = department.id
    LEFT JOIN employee e2 ON e2.role_id = e.manager_id
    ORDER BY Manager ASC`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------")
        console.table(res)
    })
    init()
}