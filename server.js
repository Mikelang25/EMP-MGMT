
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./models')


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(fileUpload());

app.use(express.static('public'))
app.use(express.static('documents'))

if (process.env.NODE_ENV === "production") {
  app.use(express.static("client/build"));
}

require('./routes/apiRoutes.js')(app)
require('./routes/htmlRoutes.js')(app)

db.sequelize.sync({ force: false }).then(function() {
  app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
});
