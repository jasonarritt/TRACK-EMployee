
-- Department table
CREATE TABLE department (
-- id: INT PRIMARY KEY
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
-- name: VARCHAR(30) to hold department name
  name VARCHAR(30) NOT NULL
);

-- Role table
CREATE TABLE role (
-- id: INT PRIMARY KEY
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
-- title: VARCHAR(30) to hold role title
  title VARCHAR(30) NOT NULL,
-- salary: DECIMAL to hold role salary
  salary DECIMAL(10,2) NOT NULL,
-- department_id: INT to hold reference to department role belongs to
  department_id INTEGER NOT NULL,
  FOREIGN KEY (department_id) REFERENCES department(id)
);

-- Employee table
CREATE TABLE employee (
-- id: INT PRIMARY KEY
  id INTEGER AUTO_INCREMENT PRIMARY KEY,
-- first_name: VARCHAR(30) to hold employee first name
  first_name VARCHAR(30) NOT NULL,
-- last_name: VARCHAR(30) to hold employee last name
  last_name VARCHAR(30) NOT NULL,
-- role_id: INT to hold reference to employee role
  role_id INTEGER NOT NULL,
-- manager_id: INT to hold reference to another employee that is the manager of the current employee (null if the employee has no manager)
  manager_id INTEGER,
  FOREIGN KEY (role_id) REFERENCES role(id),
  FOREIGN KEY (manager_id) REFERENCES employee(id)
);
