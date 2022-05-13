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
      break;

    case "Add a role":
      console.log("You have chosen Add a role!");
      break;

    case "Add an employee":
      console.log("You have chosen Add an employee!");
      break;

    case "Update an employee role":
      console.log("You have chosen Update an employee role!");
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
  db.query(`SELECT * FROM role`, function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      mainMenu();
    }
  });
}

// WHEN I choose to view all employees
// THEN I am presented with a formatted table showing employee data, including employee ids, first names, last names, job titles, departments, salaries, and managers that the employees report to
function viewAllEmployees() {
  console.log("You have entered viewAllEmployees");
  db.query(`SELECT * FROM employee`, function (err, res) {
    if (err) {
      throw err;
    } else {
      console.table(res);
      mainMenu();
    }
  });
}

// WHEN I choose to add a department
// THEN I am prompted to enter the name of the department and that department is added to the database
function addDepartment() {}

// WHEN I choose to add a role
// THEN I am prompted to enter the name, salary, and department for the role and that role is added to the database
function addRole() {}

// WHEN I choose to add an employee
// THEN I am prompted to enter the employee’s first name, last name, role, and manager, and that employee is added to the database
function addEmployee() {}

// WHEN I choose to update an employee role
// THEN I am prompted to select an employee to update and their new role and this information is updated in the database
function updateRole() {}

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
