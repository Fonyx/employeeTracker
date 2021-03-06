DROP DATABASE IF EXISTS employee_db;
CREATE DATABASE employee_db;
USE employee_db;


CREATE TABLE department(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL UNIQUE
);

CREATE TABLE role(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL, 
    salary DECIMAL NOT NULL,
    department_id INT,
    -- set the department id to null if the department parent is deleted
    FOREIGN KEY (department_id)
        REFERENCES department(id)
        ON DELETE SET NULL,
    -- combined unique for role in a department
    CONSTRAINT department_role_id UNIQUE (title,department_id)
);

CREATE TABLE employee(
    id INT NOT NULL AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INT,
    manager_id INT,
    -- Set the employee role to null if the role is deleted
    FOREIGN KEY (role_id)
        REFERENCES role(id)
        ON DELETE SET NULL,
    -- Self reference to employee table for manager
    FOREIGN KEY (manager_id)
        REFERENCES employee(id)
        ON DELETE SET NULL,
    -- combined unique for employee full name
    CONSTRAINT full_name UNIQUE (first_name,last_name)
);