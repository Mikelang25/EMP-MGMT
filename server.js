
const express = require('express');
const session = require("express-session");
const fileUpload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./models')

const bodyParse = require("body-parser")

// Requiring passport as we've configured it
const passport = require("./config/passport");


app.use(express.urlencoded({ extended: true }))
app.use(express.json());
app.use(fileUpload());
app.use(bodyParse.json());

app.use(express.static('public'))
app.use(express.static('documents'))

// We need to use sessions to keep track of our user's login status
app.use(session({ secret: "keyboard cat", resave: true, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());


if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./routes/apiRoutes.js')(app)

// app.get("*", function(req, res) {
//   res.sendFile(path.join(__dirname, "./client/build/index.html"));
// });

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
