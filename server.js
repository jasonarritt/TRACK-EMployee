const inquirer = require("inquirer");
// const mysql = require("mysql2");
const ctable = require("console.table");
const express = require("express");
const db = require("./db/connection");

const PORT = process.env.PORT || 3001;
const app = express();

// Express middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// GIVEN a command-line application that accepts user input
// WHEN I start the application
// THEN I am presented with the following options: view all departments, view all roles, view all employees, add a department, add a role, add an employee, and update an employee role
async function mainMenu() {
  const { mainMenuChoice } = await inquirer.prompt({
    type: "list",
    name: "mainMenuChoice",
    message: "Please select an option:",
    choices: [
      "View all departments",
      "View all roles",
      "View all employees",
      "Add a department",
      "Add a role",
      "Add an employee",
      "Update an employee role",
      "Exit",
    ],
  });

  switch (mainMenuChoice) {
    case "View all departments":
      console.log("You have chosen View all departments!");
      viewAllDepartments();
      break;

    case "View all roles":
      console.log("You have chosen View all roles!");
      viewAllRoles();
      break;

    case "View all employees":
      console.log("You have chosen View all employees!");
      viewAllEmployees();
      break;

    case "Add a department":
      console.log("You have chosen Add a department!");
      addDepartment();
      break;

    case "Add a role":
      console.log("You have chosen Add a role!");
      addRole();
      break;

    case "Add an employee":
      console.log("You have chosen Add an employee!");
      addEmployee();
      break;

    case "Update an employee role":
      console.log("You have chosen Update an employee role!");
      updateRole();
      break;

    case "Exit":
      console.log("You have chosen Exit TRACK-EMployee. Good bye!");
      return;

    default:
      return;
  }
}

// WHEN I choose to view all departments
// THEN I am presented with a formatted table showing department names and department ids
function viewAllDepartments() {
  console.log("You have entered viewAllDepartments");
  db.query(`SELECT * FROM department`, function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      mainMenu();
    }
  });
}

// WHEN I choose to view all roles
// THEN I am presented with the job title, role id, the department that role belongs to, and the salary for that role
function viewAllRoles() {
  console.log("You have entered viewAllRoles");
  db.query(
    `SELECT r.id, r.title, r.salary, d.name AS department
    FROM role AS r
    LEFT JOIN department AS d ON r.department_id = d.id`,
    function (err, res) {
      if (err) {
        throw err;
      } else {
        console.table(res);
        mainMenu();
      }
    }
  );
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {
  console.log("You have entered viewAllEmployees");
  db.query(
    `SELECT e.id, e.first_name, e.last_name, r.title, r.salary,COALESCE( CONCAT(m.first_name, " ", m.last_name),'') AS manager, d.name AS department FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id LEFT JOIN department AS d ON r.department_id = d.id LEFT JOIN employee AS m ON m.id = e.manager_id`,
    function (err, res) {
      if (err) {
        throw err;
      } else {
        console.table(res);
        mainMenu();
      }
    }
  );
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {
  console.log("You have entered addDepartment");
  inquirer
    .prompt({
      type: "input",
      name: "newDepartment",
      message: "What is the name of the department you would like to add?",
      validate: (response) => {
        if (response) {
          return true;
        } else {
          console.log(
            "Please enter the name of the department you would like to add!"
          );
          return false;
        }
      },
    })
    .then((response) => {
      console.log(response);
      db.query(
        `INSERT INTO department (name) VALUES ("${response.newDepartment}")`,
        function (err, res) {
          if (err) {
            throw err;
          } else {
            console.table(res);
            mainMenu();
          }
        }
      );
    });
}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
async function addRole() {
  console.log("You have entered addRole");
  inquirer
    .prompt([
      {
        type: "input",
        name: "newRoleTitle",
        message: "What is the title of the role you would like to add?",
        validate: (response) => {
          if (response) {
            return true;
          } else {
            console.log(
              "Please enter the title of the role you would like to add!"
            );
            return false;
          }
        },
      },
      {
        type: "input",
        name: "newRoleSalary",
        message: "What is the salary of the role of this new role?",
        validate: (response) => {
          if (!isNaN(response)) {
            return true;
          } else {
            console.log(
              "Please enter the salary of this new role as a number!"
            );
            return false;
          }
        },
      },
      {
        type: "input",
        name: "newRoleDepartment",
        message: "What is the department of the role of this new role?",
        validate: (response) => {
          if (response) {
            return true;
          } else {
            console.log(
              "Please enter the department of this new role as a number!"
            );
            return false;
          }
        },
      },
    ])
    .then((response) => {
      console.log(response);
      db.query(
        `INSERT INTO role (title, salary, department_id) VALUES ("${response.newRoleTitle}", "${response.newRoleSalary}", "${response.newRoleDepartment}")`,
        function (err, res) {
          if (err) {
            throw err;
          } else {
            console.table(res);
            mainMenu();
          }
        }
      );
    });
}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
async function addEmployee() {
  console.log("You have entered addEmployee");
  inquirer
    .prompt([
      {
        type: "input",
        name: "newEmployeeFirstName",
        message:
          "What is the first name of the employee you would like to add?",
        validate: (response) => {
          if (response) {
            return true;
          } else {
            console.log(
              "Please enter the first name of the employee you would like to add!"
            );
            return false;
          }
        },
      },
      {
        type: "input",
        name: "newEmployeeLastName",
        message: "What is the last name of the employee you would like to add?",
        validate: (response) => {
          if (response) {
            return true;
          } else {
            console.log(
              "Please enter the last name of the employee you would like to add!"
            );
            return false;
          }
        },
      },
      {
        type: "input",
        name: "newEmployeeRole",
        message: "What is the role of this new employee (by ID number)?",
        validate: (response) => {
          if (!isNaN(response)) {
            return true;
          } else {
            console.log(
              "Please enter the role of this new employee (by ID number)!"
            );
            return false;
          }
        },
      },
      {
        type: "input",
        name: "newEmployeeManager",
        message: "What is this new employee's manager's ID (by ID number)?",
        validate: (response) => {
          if (response) {
            return true;
          } else {
            console.log(
              "Please enter this new employee's manager's ID (by ID number)!"
            );
            return false;
          }
        },
      },
    ])
    .then((response) => {
      console.log(response);
      // if ((response.newEmployeeManager = "")) {
      //   response.newEmployeeManager = 0;
      // }
      db.query(
        `INSERT INTO employee (first_name, last_name, role_id, manager_id) VALUES ("${response.newEmployeeFirstName}", "${response.newEmployeeLastName}", "${response.newEmployeeRole}", "${response.newEmployeeManager}")`,
        function (err, res) {
          if (err) {
            throw err;
          } else {
            console.table(res);
            mainMenu();
          }
        }
      );
    });
}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
async function updateRole() {
  console.log("You have entered updateRole");
  let employeeArray = [];
  let roleArray = [];
  db.query(
    `SELECT e.id, e.first_name, e.last_name, r.title AS role
  FROM employee AS e LEFT JOIN role AS r ON e.role_id = r.id
  `,
    function (err, res) {
      if (err) {
        throw err;
      } else {
        console.table(res);
        res.forEach((employee) =>
          employeeArray.push(
            `${employee.id} ${employee.first_name} ${employee.last_name}`
          )
        );
        // console.log(employeeArray);

        db.query(
          `SELECT r.id, r.title AS role
        FROM ROLE AS r
        `,
          function (err, res) {
            if (err) {
              throw err;
            } else {
              console.table(res);
              res.forEach((role) => roleArray.push(`${role.id} ${role.role}`));
              // console.log(roleArray);

              let { selectedEmployee, updatedRole } = inquirer
                .prompt([
                  {
                    name: "selectedEmployee",
                    type: "list",
                    message:
                      "Please select the employee whose role you would like to update:",
                    choices: employeeArray,
                  },
                  {
                    name: "updatedRole",
                    type: "list",
                    message: "Please select the new role for this employee:",
                    choices: roleArray,
                  },
                ])
                .then((response) => {
                  // console.log(response.selectedEmployee);
                  // console.log(response.updatedRole);

                  let selectedEmployeeInfoArray =
                    response.selectedEmployee.split(" ");
                  let updatedRoleInfoArray = response.updatedRole.split(" ");

                  // console.log(selectedEmployeeInfoArray);
                  // console.log(updatedRoleInfoArray);

                  selectedEmployeeID = selectedEmployeeInfoArray[0];
                  selectedEmployeeFullName =
                    selectedEmployeeInfoArray[1] +
                    " " +
                    selectedEmployeeInfoArray[2];

                  // console.log(selectedEmployeeID, selectedEmployeeFullName);

                  updatedRoleID = updatedRoleInfoArray[0];
                  updatedRoleTitle = updatedRoleInfoArray[1];

                  // console.log(updatedRoleID, updatedRoleTitle);

                  db.query(
                    `UPDATE employee SET role_id = ${updatedRoleID} WHERE id = ${selectedEmployeeID}`,
                    function (err, res) {
                      if (err) {
                        throw err;
                      } else {
                        console.log(
                          selectedEmployeeFullName +
                            " is now assigned the role of " +
                            updatedRoleTitle +
                            "!"
                        );
                        mainMenu();
                      }
                    }
                  );
                });
            }
          }
        );
      }
    }
  );
}

// Default response for any other request (Not Found)
app.use((req, res) => {
  res.status(404).end();
});

// Start server after DB connection
db.connect((err) => {
  if (err) throw err;
  console.log("Database connected.");
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
    mainMenu();
  });
});
