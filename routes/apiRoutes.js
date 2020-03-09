var db = require('../models')



module.exports = function (app) {

    //downloads the file from the server
    app.get('/download/supporting/doc/:filename', function (req, res) {
        const file = __dirname + '/../issue_documents/' + req.params.filename;
        res.download(file); // Set disposition and send it.
    });

    //uploads an attachment to the documents folder
    app.post('/upload/supporting/doc', function (req, res) {
        if (!req.files || Object.keys(req.files).length === 0) {
            return res.status(400).send('No files were uploaded.');
        }

        // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
        let sampleFile = req.files.sampleFile;
        console.log(sampleFile)
        // Use the mv() method to place the file somewhere on your server
        sampleFile.mv(__dirname + '/../issue_documents/' + sampleFile.name, function (err) {
            if (err)
                return res.status(500).send(err);

            res.send('File uploaded!');
        });
    });


    // Locates the users for user Auth
    app.get('api/find/employees', function (req, res) {
        db.Employee.findAll({}).then(function (respUsers) {
            console.log(respUsers)
            res.json(respUsers)
        })
    })

    // Find all issues for a given user
    app.get('/api/find/issues/:id', function (req, res) {
        db.Issue.findAll({
            where: { employee_id: req.params.id }
        }).then(function (respTasks) {
            console.log(respTasks)
            res.json(respTasks)
        })
    })

    // Create a new employee issue 
    app.post('/api/issue', function (req, res) {
        db.Issue.create(req.body).then(function (conIssue) {
            res.json(conIssue)
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
            res.json(conEmployee)
            console.log(conEmployee)

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