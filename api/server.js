const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const PORT = 8081;
const cors = require('cors');
const mongoose = require('mongoose');
const postCreate = require('./postCreate.js');
const dbConfig = 'mongodb://127.0.0.1:27017/bigdatayow';
const db = mongoose.connection;

mongoose.Promise = global.Promise;
mongoose.connect(dbConfig, { useNewUrlParser: true, useUnifiedTopology: true }
).then(() => {
  console.log("Connected to dbs.");
}).catch(err => {
  console.log('Cannot connect to dbs.', err);
  process.exit();
});
db.on('error', console.error.bind(console, 'MongoDB connection error:'));


app.use(cors());
app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());

app.post('/post', function (req, res) {
  postCreate.create(req, res);
  // console.log(req.body)
});


app.listen(PORT, function(){
  console.log('Server is running on Port:',PORT);
});