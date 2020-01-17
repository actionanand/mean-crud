const path = require('path');
const express = require('express');
const bodyParser = require("body-parser");
const mongoose = require('mongoose');

const postRoutes = require('./routes/posts');
const userRoutes = require('./routes/user');

const app = express();
// mongoose.set('useCreateIndex', true);

mongoose.connect("mongodb+srv://node_user:" + process.env.MONGO_ATLAS_PW + "@cluster0-spndl.mongodb.net/node-angular?retryWrites=true&w=majority", 
{ useNewUrlParser: true , useUnifiedTopology: true, useCreateIndex: true }).
then(()=> {
  console.log('mongoDB connected!');
})
.catch(()=> {
  console.log('mongoDB NOT connected!');
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use("/images", express.static(path.join("images")));

app.use((req, res, next) => {
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept, authorization"
  );
  res.setHeader(
    "Access-Control-Allow-Methods",
    "GET, POST, PUT, PATCH, DELETE, OPTIONS"
  );
  next();
});

app.use("/api/posts", postRoutes);
app.use("/api/user", userRoutes);

module.exports = app;
