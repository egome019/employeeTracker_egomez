-- seeds for dept table
USE workPlace_DB;

INSERT INTO department (dept_name) VALUES ("Human Resources"), ("Legal"), ("Finance"), ("Sales"), ("Engineering"), ("Customer Service");

INSERT INTO empRole (title, salary, dept_id) VALUES ("HR Manager", 100000, 1), ("Legal Dept Manager", 200000, 2), ("Finance Manager", 120000, 3), ("Sales Manager", 100000, 4),("Engineering Manager", 200000, 5), ("CS Manager", 100000, 6), ("Lawyer", 250000, 2), ("Accountant", 100000, 3), ("Sales Lead", 80000, 4), ("Engineer", 100000, 5), ("Customer Service Supervisor", 70000, 6), ("Customer Service Rep", 50000, 6);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Landon", "Donovan", 1, NULL), ("Lionel", "Messi", 2, NULL), ("Cristiano", "Ronaldo", 3, NULL), ("Jose", "Mourinho", 4, NULL), ("Carlo", "Ancelotti", 5, NULL), ("Josep", "Guardiola", 6, NULL);