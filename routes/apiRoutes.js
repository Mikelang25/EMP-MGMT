var db = require('../models')
const Nylas = require('nylas');
require('dotenv').config()


Nylas.config({
    clientId: process.env.NYLAS_CLIENT,
    clientSecret: process.env.NYLAS_SECRET,
});

const nylas = Nylas.with(process.env.NYLAS_AUTH);


module.exports = function (app) {
    

    //uploads an attachment to the documents folder
    app.post('/upload/supporting/doc', function (req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
          }
        
          // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
          let sampleFile = req.files.sampleFile;
          console.log(sampleFile)        
          // Use the mv() method to place the file somewhere on your server
          sampleFile.mv(__dirname + '/../issue_documents/' + sampleFile.name, function(err) {
            if (err)
              return res.status(500).send(err);
        
            res.send('File uploaded!');
          });
    });


    // Locates the users for user Auth
    app.get('/api/find/users', function (req, res) {
        db.User.findAll({}).then(function (respUsers) {
            console.log(respUsers)
            res.json(respUsers)
        })
    })

    // Find all issues for a given user
    app.get('/api/find/issues/:id', function (req, res) {
        db.Issue.findAll({
            where: { user_id: req.params.id },
            order: [
                ['task_day', 'ASC'],
                ['task_stime', 'ASC']
            ]
        }).then(function (respTasks) {
            console.log(respTasks)
            res.json(respTasks)
        })
    })

    //Get all tasks and emails them to the user 
    app.get('/api/email/tasks/:id/:email', function (req, res) {
        db.Task.findAll({
            where: { user_id: req.params.id },
            order: [
                ['task_day', 'ASC'],
                ['task_stime', 'ASC']
            ]
        }).then(function (dbTasks) {
            console.log(dbTasks)
            res.json(dbTasks)

            var taskList = "<h1>Your Schedule</h1><br>"
            for (var i = 0; i < dbTasks.length; i++) {
                taskList += "Event Day: " + dbTasks[i].task_day + "<br>" +
                    "Event Name: " + dbTasks[i].task_name + "<br>" +
                    "Start Time: " + dbTasks[i].task_stime + "<br>" +
                    "End Time: " + dbTasks[i].task_etime + "<br>" +
                    "Event Notes: " + dbTasks[i].task_comment + "<br><br>"
            }
            taskList += "<br>From, <br> Your MyCalendar Team"

            const draft = nylas.drafts.build({
                subject: 'Your Upcoming Schedule',
                to: [{ name: 'MyCalendar User', email: req.params.email }],
                body: taskList
            });

            // Send the draft
            draft.send().then(message => {
                console.log(`${message.id} was sent`);
            });
        })
    })

    // Create a new example
    app.post('/api/tasks', function (req, res) {
        db.Task.create(req.body).then(function (taskExample) {
            res.json(taskExample)
        })
    })
    //post a new user
    app.post('/api/users', function (req, res) {
        db.User.create(req.body).then(function (userExample) {
            res.json(userExample)
            console.log(userExample)

        })
    })

    // Delete a task by id
    app.delete('/api/tasks/:id', function (req, res) {
        db.Task.destroy({ where: { id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample)
        })
    })

    app.delete('/api/tasks/deleteall/:id', function (req, res) {
        db.Task.destroy({ where: { user_id: req.params.id } }).then(function (dbExample) {
            res.json(dbExample)
        })
    })

    app.put('/api/tasks/:id', function (req, res) {
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
}