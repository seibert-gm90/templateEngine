const inquirer = require("inquirer");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");
const fs = require("fs");

const employeeArray = [];
let teamName = ""

function createTeam() {
  console.log("Let's build an engineering team!");
  return nameTeam();
};
createTeam()


function nameTeam() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "teamName",
        message: "What do you want your team name to be? (Only letters and number)",

      }
    ])

    .then(val => {
      teamName = val.teamName;
      return createManager();
    })
}



function createManager() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: "What is this manager's name?",
      },
      {
        type: "input",
        name: "employeeID",
        message: "What is the manager's employee ID number?"
      },
      {
        type: "input",
        name: "employeeEmail",
        message: "What is the manager's email?",
      },
      {
        type: "input",
        name: "officeNumber",
        message: "What is the manager's office number?",
      }
    ])
    .then(val => {
      const newManager = new Manager(
        val.employeeName,
        val.employeeId,
        val.employeeEmail,
        val.officeNumber,
      );
      employeeArray.push(newManager);
      return createEngineer();
    });
}



function createEngineer() {
  console.log("Let's choose your engineer.")

  return inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: "What is the engineers's name?",
      },
      {
        type: "input",
        name: "employeeID",
        message: "What is the engineer's ID number?",
      },
      {
        type: "input",
        name: "employeeEmail",
        message: "What is the engineer's email?",
      },
      {
        type: "input",
        name: "employeeGithub",
        message: "What is the engineers's GitHub username?",
        validate: function (val) {
          return /[a-z1-9]/gi.test(val);
        },
      }
    ])
    .then(val => {
      const newEngineer = new Engineer(
        val.employeeName,
        val.employeeId,
        val.employeeEmail,
        val.employeeGithub
      );
      employeeArray.push(newEngineer);
      return createIntern();
    });
}



function createIntern() {
  return inquirer
    .prompt([
      {
        type: "input",
        name: "employeeName",
        message: "What is the intern's name?",
      },
      {
        type: "input",
        name: "employeeID",
        message: "What is the intern's ID number?",
      },
      {
        type: "input",
        name: "employeeEmail",
        message: "What is the intern's email?",
      },
      {
        type: "input",
        name: "employeeSchool",
        message: "What is the name of the intern's school?"
      },
    ])
    .then(val => {
      const newIntern = new Intern(
        val.employeeName,
        val.employeeId,
        val.employeeEmail,
        val.employeeSchool
      );
      employeeArray.push(newIntern);
      return askIfDone();
    });

};

function askIfDone() {
  return inquirer
    .prompt([{
      type: "list",
      name: "userDone",
      choices: ["yes", "no"]
    }

    ])
    .then(val => {
      if (val.userDone === "yes") {
        return completeTeam();
      } else {
        return getTitle();
      }
    });
}
function getTitle() {
  return inquirer
    .prompt([

      {
        type: "list",
        name: "employeeTitle",
        message: "What type of employee would you like to add to your team?",
        choices: ["Engineer", "Intern"]
      }
    ])
    .then(val => {
      const employeeTitle = val.employeeTitle;
      switch (employeeTitle) {
        case "Engineer":
          return createEngineer();
        case "Intern":
          return createIntern();
      }
    });
}
function completeTeam() {

  // Create HTML card for each employee
  let allEmployeesHTML = "";
  for (const employee of employeeArray) {
    switch (employee.title) {
      case "Manager":
        const managerHTMLcard = managerHTML(
          employee.name,
          employee.title,
          employee.id,
          employee.email,
          employee.officeNumber
        );
        allEmployeesHTML += managerHTMLcard;
        break;
      case "Engineer":
        const engineerHTMLcard = engineerHTML(
          employee.name,
          employee.title,
          employee.id,
          employee.email,
          employee.github
        );
        allEmployeesHTML += engineerHTMLcard;
        break;
      case "Intern":
        const internHTMLcard = internHTML(
          employee.name,
          employee.title,
          employee.id,
          employee.email,
          employee.school
        );
        allEmployeesHTML += internHTMLcard;
        break;
    }
  }

  // Write employee summary HTML file
  const fullHTML = pageHTML(allEmployeesHTML);

  fs.writeFile(`./output/${teamName}.html`, fullHTML, err => {
    if (err) {
      return console.log(err);
    }
    console.log(
      `Successfully wrote ${teamName}.html in the output folder.`
    );
  });
}
function managerHTML(name, title, id, email, office) {
  return `
    <div class="card bg-light">
      <div class="card-header">
        <h2 class="font-weight-bold">${name}</h2>
        <h3>${title}</h3>
      </div>
      <div class="card-body bg-light">
        <p class="employeeID">ID: ${id}</p>
        <p class="employeeEmail">
          Email: ${email}
        </p>
        <p class="employeeThird">Office number: ${office}</p>
      </div>
    </div>
    `;
}

function engineerHTML(name, title, id, email, github) {
  return `
    <div class="card bg-light">
      <div class="card-header">
        <h2 class="font-weight-bold">${name}</h2>
        <h3>${title}</h3>
      </div>
      <div class="card-body bg-light">
        <p class="employeeID">ID: ${id}</p>
        <p class="employeeEmail">
          Email: ${email}
        </p>
        <p class="employeeThird">GitHub: <a href="https://github.com/${github}" target="_blank">${github}</a></p>
      </div>
    </div>
    `;
}

function internHTML(name, title, id, email, school) {
  return `
    <div class="card bg-light">
      <div class="card-header">
        <h2 class="font-weight-bold">${name}</h2>
        <h3>${title}</h3>
      </div>
      <div class="card-body bg-light">
        <p class="employeeID">ID: ${id}</p>
        <p class="employeeEmail">
          Email: ${email}
        </p>
        <p class="employeeThird">School: ${school}</p>
      </div>
    </div>
    `;
}

function pageHTML(allEmployeesHTML, nameTeam) {
  return `
  <!DOCTYPE html>
  <html lang="en">
    <head>
      <meta charset="UTF-8" />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta http-equiv="X-UA-Compatible" content="ie=edge" />
      <title>${teamName} Employee Summary</title>
      <!--Bootstrap CDN-->
      <link
        rel="stylesheet"
        href="https://stackpath.bootstrapcdn.com/bootstrap/4.4.1/css/bootstrap.min.css"
        integrity="sha384-Vkoo8x4CGsO3+Hhxv8T/Q5PaXtkKtu6ug5TOeNV6gBiFeWPGFN9MuhOf23Q9Ifjh"
        crossorigin="anonymous"
      />
      <style>
        #employeeDetails .card {
          margin: 15px;
          min-width: 260px;
        }
        .employeeID,
        .employeeEmail,
        .employeeThird {
          background-color: white;
          border: 1px solid #ddd;
          padding: 8px 16px;
          margin: 0;
        }
        .employeeID {
          border-radius: 0.25rem 0.25rem 0 0;
          border-bottom: none;
        }
        .employeeThird {
          border-radius: 0 0 0.25rem 0.25rem;
          border-top: none;
        }
      </style>
    </head>
    <body>
      <header>
        <div class="jumbotron jumbotron-fluid bg-primary">
          <div class="container-fluid">
            <div class="row">
              <div class="col">
                <h1 class="text-light text-center font-weight-bold">Team Employee Summary</h1>
                <h3 class="text-light text-center">Team Name: ${teamName}</h3>
              </div>
            </div>
          </div>
        </div>
      </header>
      <section>
        <div class="container-fluid">
          <div class="row">
            <div
              class="col d-flex justify-content-center flex-wrap"
              id="employeeDetails"
            >
              ${allEmployeesHTML}
            </div>
          </div>
        </div>
      </section>
    </body>
  </html>
    `;
}


