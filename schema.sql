/* Create database */
CREATE DATABASE workPlace_DB;
USE workPlace;

/* Create new table with a primary key that auto-increments, and a text field */
CREATE TABLE employee (
  id INT AUTO_INCREMENT,
  first_name VARCHAR(30),
  last_name VARCHAR(30),
  role_id INT FOREIGN KEY,
  manager_id INT FOREIGN KEY,
  PRIMARY KEY(id)
);

CREATE TABLE empRole (
  id INT AUTO_INCREMENT,
  title VARCHAR(30),
  salary DECIMAL,
  department_id INT FOREIGN KEY,
  PRIMARY KEY(id)
);

CREATE TABLE department (
  id INT AUTO_INCREMENT,
  dept_name VARCHAR(30),
  PRIMARY KEY(id)
);