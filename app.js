const inquirer = require("inquirer");
const Engineer = require("./Engineer");
const Intern = require("./Intern");
const Manager = require("./Manager");
const fs = require("fs");


function createTeam() {
    this.employeeArray = [];
    console.log("Let's build an engineering team!");
    return this.nameTeam();
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
            this.teamName = val.teamName;
            return this.createManager();
        })
}

nameTeam()

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
                message: "What is the employee's email?",
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
            this.employeeArray.push(newManager);
            return this.createEngineer();
        });
}

createManager()

function createEngineer() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "employeeName",
                message: "What is this employee's name?",
            },
            {
                type: "input",
                name: "employeeID",
                message: "What is this employee's ID number?",
            },
            {
                type: "input",
                name: "employeeEmail",
                message: "What is the employee's email?",
            },
            {
                type: "input",
                name: "employeeGithub",
                message: "What is this employee's GitHub username?",
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
            this.employeeArray.push(newEngineer);
            return this.askIfDone();
        });
}

createEngineer()

function createIntern() {
    return inquirer
        .prompt([
            {
                type: "input",
                name: "employeeName",
                message: "What is this employee's name?",
            },
            {
                type: "input",
                name: "employeeID",
                message: "What is this employee's ID number?",
            },
            {
                type: "input",
                name: "employeeEmail",
                message: "What is the employee's email?",
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
                this.employeeArray.push(newIntern);
                return this.askIfDone();
            });
    
};

function askIfDone(){
    return inquirer
    .prompt([{
        type: "list", 
        name: "userDone", 
        choices: ["yes", "no"]
    }

    ])
    .then(val => {
        if (val.userDone === "Yes") {
          return this.completeTeam();
        } else {
          return this.getTitle();
        }
      });
}


function makeHTML(employeesHTML, teamName) {
    return `<!DOCTYPE html>
    <html lang="en">
    
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Team Generator Summary</title>
        <link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css"
            integrity="sha384-ggOyR0iXCbMQv3Xipma34MD+dH/1fQ784/j6cY/iJTQUOhcWr7x9JvoRxT2MZw1T" crossorigin="anonymous">
       
    
    </head>
    
    <body>
        <header>
            <div class="container">
                <div class="row">
                    <div class="col">
                        <div class="card dark">
                            <img src="${ghRes.data.avatar_url}" height="175" />
                            <h1>${ghRes.data.name}</h1>
                            <p class="header-links d-flex justify-content-center flex-wrap">
                                <a href="https://www.google.com/maps/place/${ghRes.data.location}">
                                    ${ghRes.data.location}
                                </a>
                                <a href="${ghRes.data.userProfile}">Gabby's GitHub </a>
                                <a href="${ghRes.data.blog}"></a>
                            </p>
                        </div>
                    </div>
                </div>
        </header>
        <div class="row">
            <div class="col">
                <p>${ghRes.data.bio}</p>
            </div>
        </div>
        <div class="row">
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body " id="public-repos">
                        <h5>Repos</h5>
                        <p>${ghRes.data.public_repos}</p>
                    </div>
                </div>
            </div>
            <div class="col-lg-6">
                <div class="card">
                    <div class="card-body " id="followers">
                        <h5>Followers</h5>
                        <p>${ghRes.data.followers}</p>
                    </div>
                </div>
            </div>
    
            <div class="row">
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body " id="gh-stars">
                            <h5>GitHub</h5>
                            <p>${ghstarsqueryURL.data.length}</p>
                        </div>
                    </div>
                </div>
                <div class="col-lg-6">
                    <div class="card">
                        <div class="card-body " id="following">
                            <h5>Following</h5>
                            <p>${ghRes.data.following}</p>
                        </div>
                    </div>
                </div>
            </div>
    
    
    </body>
    
    </html>`
}

