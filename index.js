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
                addEmp()
                break;
            case "Remove Employee":
                delEmp()
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
        init()
    })
    
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
        init()
    })
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
        init()
    })
}

const empRoleArr = [];
const role = () => {
    const query = "SELECT * FROM empRole";
    connection.query(query, (err, res) => {
        if (err) throw err
        for (var index = 0; index < res.length; index++){
            empRoleArr.push(res[index].title);
        }

    })
    return empRoleArr;
}

const managersAvail = [];
const managers = () => {
    const query = "SELECT first_name, last_name FROM employee WHERE manager_id IS NULL";
    connection.query(query, (err, res) => {
        if (err) throw err
        for (var index = 0; index < res.length; index++){
            managersAvail.push(res[index].first_name + " " + res[index].last_name);
        }

    })
    return managersAvail;
}

const addEmp = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "fname",
            message: "What is the new employee's first name?"
        },
        {
            type: "input",
            name: "lname",
            message: "What is the new employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the new employee's job title?",
            choices: role()
        },
        {
            type: "list",
            name: "manager",
            message: "Who is your new employee's Manager?",
            choices: managers()
        }
    ])
    .then((answers) => {
        const roleId = role().indexOf(answers.role) + 1;
        console.log(roleId)
        const managerId = managers().indexOf(answers.manager) + 1;
        console.log(managerId)
        const query = `INSERT INTO employee SET ?`;
        const object = {
            first_name: answers.fname,
            last_name: answers.lname,
            role_id: roleId,
            manager_id: managerId
        }
        connection.query(query, object, (err, res) => {
            if (err) throw err;
            console.log("---------------")
            console.table(res.affectedRows + " employee was added.\n")
            init()
        })
    })
}

const delEmp = () => {
    const query = "SELECT first_name, last_name FROM employee";
    connection.query(query, (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: "list",
                name: "employee",
                message: "Which employee would you like to remove?",
                choices: function () {
                    let employArr = [];
                    for (var j = 0; j < res.length; j++){
                        employArr.push(res[j].first_name + " " + res[j].last_name);
                    }
                    return employArr;
                }
            }
        ])
        .then((answers) => {
            const queryId = "SELECT * FROM employee";
            connection.query(queryId, (err, res) => {
                if (err) throw err
                let delEmploy;
                for (var i = 0; i < res.length; i++) {
                    const chosenEmp = res[i].first_name + " " + res[i].last_name;
                    if (chosenEmp === answers.employee) {
                        delEmploy = res[i].id
                    
                    }
                }
                const object = {
                    id: delEmploy
                }
                const query = `DELETE FROM employee WHERE id = ${object.id}`;
                connection.query(query, (err, res) => {
                    if (err) throw err;
                    console.log("---------------")
                    console.table(res.affectedRows + " employee was deleted.\n")
                    init()
                })
            })
            
        })
    })
}

