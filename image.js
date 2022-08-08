const express = require("express");
const app = express();
const mongoose = require("mongoose");
const userRoutes= require('./routes/user');

require("dotenv")
  .config();

//Connect to database
try {
  mongoose.connect("mongodb://localhost:27017/cloudinary");
  console.log("connected to db");
} catch (error) {
  handleError(error);
}
process.on('unhandledRejection', error => {
  console.log('unhandledRejection', error.message);
});

// parse requests of content-type - application/json
app.use(express.json());
// parse requests of content-type - application/x-www-form-urlencoded
app.use(express.urlencoded({
  extended: true
}));

app.use("/user",userRoutes);

app.listen(process.env.PORT || 8080, function () {
  console.log("App running!");
});