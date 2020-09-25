-- seeds for dept table
USE workPlace_DB;

INSERT INTO department (dept_name) VALUES ("Human Resources"), ("Legal"), ("Finance"), ("Sales"), ("Engineering");

INSERT INTO empRole (title, salary, dept_id) VALUES ("Manager", 100,000, 1), ("Lawyer", 250,000, 2), ("Accountant", 150,000, 3), ("Sales Lead", 90,000, 4), ("Lead Engineer", 100,000, 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("Landon", "Donovan", 4, 9), ("Lionel", "Messi", 5, 10), ("Cristiano", "Ronaldo", 3, 8), ("Jose", "Mourinho", 1, NULL);