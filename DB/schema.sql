-- /* Create database */
CREATE DATABASE workPlace_DB;
USE workPlace_DB;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT NOT NULL,
  manager_id INT,
  CONSTRAINT fk_role FOREIGN KEY(role_id) REFERENCES empRole(id) ON DELETE restrict ON UPDATE cascade,
  CONSTRAINT fk_manager FOREIGN KEY(manager_id) REFERENCES empRole(id) ON DELETE restrict ON UPDATE cascade,
  PRIMARY KEY(id)
);

CREATE TABLE empRole (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  PRIMARY KEY(id),
  dept_id INT NOT NULL,
  CONSTRAINT fk_dept FOREIGN KEY (dept_id) REFERENCES department(id) ON DELETE restrict ON UPDATE cascade
);

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY(id)
);

SELECT * FROM department;
SELECT * FROM empRole;
SELECT * FROM employee;