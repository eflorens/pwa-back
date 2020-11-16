const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const usrRoutes = require('./routes/usersRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(bodyParser.json());

mongoose.connect('mongodb://localhost:27017/db', {useNewUrlParser: true, useUnifiedTopology: true}).then(() => {
  console.log('Connected to Database');
}).catch((error) => {
  console.log('Unable to connect to Database');
  console.log(error);
});

app.use('/auth', usrRoutes);


app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});