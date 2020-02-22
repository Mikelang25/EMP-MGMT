// *****************************************************************************
// Server.js - This file is the initial starting point for the Node/Express server.
//
// ******************************************************************************
// *** Dependencies
// =============================================================
var express = require('express')
const fileUpload = require('express-fileupload');

// Sets up the Express App
// =============================================================
var app = express()
var PORT = process.env.PORT || 8000

// Requiring our models for syncing
var db = require('./models')

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload());

// Static directory
app.use(express.static('public'))
app.use(express.static('documents'))

// Routes
// =============================================================
require('./routes/apiRoutes.js')(app)
require('./routes/htmlRoutes.js')(app)

// Syncing our sequelize models and then starting our Express app
// =============================================================
db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
