const db = require('../models')
const nodemailer = require('nodemailer');
const passport = require("../config/passport");
const aws2 = require("../aws")

module.exports = function (app) {

    app.post("/api/aws/test", function (req, res) {
        aws2.create("empt-mgt-3")
    });

    // Using the passport.authenticate middleware with our local strategy.
    // If the user has valid login credentials, send them to the members page.
    // Otherwise the user will be sent an error
    app.post("/api/login", passport.authenticate("local"), function (req, res) {
        res.json(req.user);
    });

    // Route for signing up a user. The user's password is automatically hashed and stored securely thanks to
    // how we configured our Sequelize User Model. If the user is created successfully, proceed to log the user in,
    // otherwise send back an error
    app.post("/api/signup", function (req, res) {
        db.User.create({
            email: req.body.email,
            password: req.body.password
        })
            .then(function () {
                res.redirect(307, "/api/login");
            })
            .catch(function (err) {
                res.status(401).json(err);
            });
    });

    // Route for logging user out
    app.get("/logout", function (req, res) {
        req.logout();
        res.redirect("/");
    });

    //downloads the file from the server
    app.get('/download/:filename', function (req, res) {
        const file = __dirname + '/../client/public/' + req.params.filename;
        res.download(file); // Set disposition and send it.
    });

    //uploads an attachment to the documents folder
    app.post('/uploadfile/:employee', function (req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        let sampleFile = req.files.file;
        let selectEmployee = req.params.employee
        aws2.upload(sampleFile, selectEmployee)

    });

    // Locates the users for user Auth
    app.get('/api/find/employees', function (req, res) {
        db.Employee.findAll({}).then(function (respUsers) {
            res.json(respUsers)
        })
    })

    app.get('/api/find/employee/:email', function (req, res) {
        db.Employee.findOne({
            where: {
                emp_email: req.params.email
            }
        }).then(function (reqEmployee) {
            res.json(reqEmployee)
        })
    })

    // Find all issues for a given user
    app.get('/api/find/issues', function (req, res) {
        db.Issue.findAll({}).then(function (respTasks) {
            res.json(respTasks)
        })
    })

    app.get('/api/find/issuessearch', function (req, res) {
        db.Issue.findAll({
            where: {
                confirm_date: null
            }
        }).then(function (respTasks) {
            res.json(respTasks)
        })
    })

    app.post('/api/accounting', function (req, res) {
        db.Budget.create(req.body).then(function (newItem) {
            console.log("create budget item")
            res.json(newItem)
        })
    })


    app.delete('/api/accounting/:id', function (req, res) {
        db.Budget.destroy({ where: { id: req.params.id } }).then(function (accountItem) {
            res.json(accountItem)
        })
    })

    app.get('/api/find/accounting', function (req, res) {
        db.Budget.findAll({}).then(function (respItems) {
            res.json(respItems)
        })
    })

    // Create a new employee issue and sends email to employee
    app.post('/api/issue', function (req, res) {
        db.Issue.create(req.body).then(function (conIssue) {
            res.json(conIssue)
            const employeeID = conIssue.employee_id

            db.Employee.findOne({

                where: {
                    id: employeeID
                }
            }).then(function (empInfo) {
                var transporter = nodemailer.createTransport({
                    service: 'gmail',
                    auth: {
                        user: 'mal3jackie@gmail.com',
                        pass: 'Carnelli7ct'
                    },
                    tls: {
                        // do not fail on invalid certs
                        rejectUnauthorized: false
                    }
                });

                var mailOptions = {
                    from: 'mal3jackie@gmail.com',
                    to: empInfo.emp_email,
                    subject: conIssue.issue_short_descr,
                    text: "Issue Description: " + conIssue.issue_full_descr,
                    html: "<p>This is to let you know that an issue has been raised regarding your conduct. <br> Please click the link below to view and acknowledge the issue</p><br>" +
                        "<a href='https://serene-savannah-13108.herokuapp.com/#/search'>Search Issues</a>"
                };

                transporter.sendMail(mailOptions, function (error, info) {
                    if (error) {
                        console.log(error);
                    } else {
                        console.log('Email sent: ' + info.response);
                    }
                })
            });
        })
    })

    //post a new user
    app.post('/api/user', function (req, res) {
        db.User.create(req.body).then(function (userExample) {
            res.json(userExample)
            console.log(userExample)

        })
    })

    //posts a new employee
    app.post('/api/employee', function (req, res) {
        db.Employee.create(req.body).then(function (conEmployee) {
            console.log("create employee")
            aws2.create(conEmployee.id)
            setTimeout(function () {
                aws2.uploadphoto(conEmployee.id)
            }, 5000)
            res.json(conEmployee)
        })
    })

    app.delete('/api/employee/:id', function (req, res) {
        db.Employee.destroy({ where: { id: req.params.id } }).then(function (employeeInfo) {
            res.json(employeeInfo)
        })
    })

    //deletes a selected employee issue
    app.delete('/api/issue/deleteall/:id/:employee', function (req, res) {
        db.Issue.findOne({
            where: {
                id: req.params.id
            }
        }).then(function (issue) {
            db.Issue.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
                res.json(dbExample)
            })
            aws2.delete(issue.issue_attach, req.params.employee)
        })


    })

    //updats the selected issue record
    app.put('/api/issues/:id', function (req, res) {
        db.Task.update({
            task_comment: req.body.task_comment,
            task_name: req.body.task_name,
            task_day: req.body.task_day
        }, {
            where: { id: req.params.id }
        }).then(function (dbExample) {
            res.json(dbExample)
        })
    })

    //updats the selected issue record
    app.put('/api/accept/issues/:id', function (req, res) {
        var today = new Date();
        const dd = String(today.getDate()).padStart(2, '0');
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const yyyy = today.getFullYear();

        today = yyyy + '-' + mm + '-' + dd;
        const stringDate = today.toString()

        console.log(stringDate)

        db.Issue.update({
            confirm_date: stringDate
        }, {
            where: { id: req.params.id }
        }).then(function (dbExample) {
            res.json(dbExample)
        })
    })

    //updates the selected employee record
    app.put('/api/employee', function (req, res) {
        db.Employee.update({
            emp_fname: req.body.emp_fname,
            emp_lname: req.body.emp_lname,
            emp_email: req.body.emp_email,
            emp_pay: req.body.emp_pay,
            emp_hire_date: req.body.emp_hire_date,
            emp_photo: req.body.emp_photo
        }, {
            where: { id: req.body.id }
        }).then(function (dbExample) {
            res.json(dbExample)
        })
    })
}