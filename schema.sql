-- /* Create database */
CREATE DATABASE workPlace_DB;
USE workPlace_DB;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT not null,
  constraint fk_role foreign key(role_id) references empRole(id) on delete restrict on update cascade,
  constraint fk_manager foreign key(manager_id) references empRole(id) on delete restrict on update cascade,
  PRIMARY KEY(id)
);

CREATE TABLE empRole (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  PRIMARY KEY(id),
  dept_id int not null,
  constraint fk_dept FOREIGN KEY (dept_id) REFERENCES department(id) on delete restrict on update cascade
);

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY(id)
);

SELECT * FROM department;
select * from empRole;
select * from employee;