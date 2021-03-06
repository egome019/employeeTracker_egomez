// Dependencies
const mysql = require("mysql");
const inquirer = require("inquirer");
const cTable = require("console.table")
// mySql connection login
const connection = mysql.createConnection({
    host: "localhost",

    port: 3306,

    user: "root",

    password: "",
    database: "workPlace_DB"
});
// connects to database
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
            "View All Employees By Role",
            "Add Employee",
            "Remove Employee",
            "Update Employee Role",
            "Add Roles",
            "Add Department",
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
            case "View All Employees By Role":
                viewAllRole()
                break;
            case "Add Employee":
                addEmp()
                break;
            case "Remove Employee":
                delEmp()
                break;
            case "Update Employee Role":
                updateRole()
                break;
            case "Add Roles":
                addRole()
                break;
            case "Add Department":
                addDept()
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
// view all employee data sorted by department
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
// view all employee data sorted by role
const viewAllRole = () => {
    const query = `SELECT e.id, e.first_name AS "First Name" , e.last_name AS "Last Name", title AS "Title", dept_name AS "Department", salary, CONCAT(e2.first_name, " ", e2.last_name) AS Manager
    FROM employee e
    INNER JOIN empRole ON e.role_id = empRole.id
    INNER JOIN department ON dept_id = department.id
    LEFT JOIN employee e2 ON e2.role_id = e.manager_id
    ORDER BY Title ASC`;

    connection.query(query, (err, res) => {
        if (err) throw err;
        console.log("---------------")
        console.table(res)
        init()
    })
}
// these two consts were used to display the roles in the choices property for the add employee functionality
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
// these two consts were used to display the roles in the choices property for the add employee functionality
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
// this was the function for adding employees to the database
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
        const managerId = managers().indexOf(answers.manager) + 1;
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
// this was the function for deleting employees from the database
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
// this function was for updating an existing employees role
const updateRole = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "fname",
            message: "What is the employee's first name?"
        },
        {
            type: "input",
            name: "lname",
            message: "What is the employee's last name?"
        },
        {
            type: "list",
            name: "role",
            message: "What is the employee's new job title?",
            choices: role()
        }
    ])
    .then((answers) => {
        const roleId = role().indexOf(answers.role) + 1;
        const fname = answers.fname;
        const lname = answers.lname;
        const query = `UPDATE employee SET role_id = ? WHERE first_name = ? AND last_name = ?`;
        connection.query(query, [roleId, fname, lname], (err, res) => {
            if (err) throw err;
            console.log("---------------")
            console.table(res.affectedRows + " employee was updated.\n")
            init()
        })
    })
}
// this was the function for adding a new department to the database
const addDept = () => {
    inquirer.prompt([
        {
            type: "input",
            name: "deptName",
            message: "What is the name of the new department?"
        }
    ])
    .then((answers) => {
        const query = `INSERT INTO department SET ?`;
        const object = {
            dept_name: answers.deptName
        }
        connection.query(query, object, (err, res) => {
            if (err) throw err;
            console.log("---------------")
            console.table(res.affectedRows + " department was added.\n")
            init()
        })
    })
}
// this was the function for adding a new role to the database
const addRole = () => {
    const query = "SELECT * FROM department";
    connection.query(query, (err, res) => {
        if (err) throw err
        inquirer.prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the new role?"
            },
            {
                type: "input",
                name: "salary",
                message: "What is the salary the new role has?"
            },
            {
                type: "list",
                name: "dept",
                message: "What department does this role belong to?",
                choices: function () {
                    let deptAvail = [];
                    for (var q = 0; q < res.length; q++){
                        deptAvail.push(res[q].dept_name);
                    }
                    return deptAvail;
                }
            }
        ])
        .then((answers) => {
            let chosenDept;
            for (var i = 0; i < res.length; i++) {
                if (res[i].dept_name === answers.dept) {
                    chosenDept = res[i].id
                }
            }
            const query = `INSERT INTO empRole SET ?`;
            const object = {
                title: answers.roleName,
                salary: answers.salary,
                dept_id: chosenDept
            }     
            connection.query(query, object, (err, res) => {
                if (err) throw err;
                console.log("---------------")
                console.table(res.affectedRows + " new role was added.\n")
                init()
            })
        
        })
    })
}