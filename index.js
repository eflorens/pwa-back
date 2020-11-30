const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const cors = require('cors');

require('dotenv').config();

const usrRoutes = require('./routes/usersRoutes');
const imgRoutes = require('./routes/imagesRoutes');

const app = express();
const port = process.env.PORT || 8000;

app.use(cors());
app.use(bodyParser.json());

mongoose.connect(process.env.MONGODB_ATLAS_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true
}).then(() => {
  console.log('Connected to Database');
}).catch((error) => {
  console.log('Unable to connect to Database');
  console.log(error);
});

app.use('/auth', usrRoutes);
app.use('/img', imgRoutes);

app.get('/', (req, res) => {
  res.send('Hello World!!');
});

app.listen(port, () => {
  console.log(`Example app listening on port ${port}!`);
});