-- seeds for dept table
use workPlace_DB;

insert into department (dept_name) values ("Human Resources"), ("Legal"), ("Finance"), ("Sales"), ("Engineering");

insert into empRole (title, salary, dept_id) values ("Manager", 100,000, 1), ("Lawyer", 250,000, 2), ("Accountant", 150,000, 3), ("Sales Lead", 90,000, 4), ("Lead Engineer", 100,000, 5);

insert into employee (first_name, last_name, role_id, manager_id) values ("Landon", "Donovan", 4, 4), ("Lionel", "Messi", 5, 5), ("Cristiano", "Ronaldo", 3, 3), ("Jose", "Mourinho", 1, 1);