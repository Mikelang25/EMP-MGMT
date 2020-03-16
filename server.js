
const express = require('express');
const fileUpload = require('express-fileupload');
const app = express();
const PORT = process.env.PORT || 3001;
const db = require('./models')
const cors = require('cors');


app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(cors())
app.use(fileUpload());

app.use(express.static('public'))
app.use(express.static('documents'))


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
