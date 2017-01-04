// Catches uncaught exceptions and prevents app crashes
process.on('uncaughtException', (err) => {
  console.error(err.stack || err);
});

const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const path = require('path');

if (process.env.NODE_ENV !== 'production') {
  require('dotenv').config();
}

const app = express();
const apiRoutes = require('./app/routes/api_routes');

// DB Setup
mongoose.Promise = global.Promise;
if (process.env.NODE_ENV !== 'test') {
  const dbUrl = process.env.MONGOLAB_URI || 'mongodb://localhost:27017/nigthlife-fcc';
  mongoose.connect(dbUrl);
  const db = mongoose.connection;
  db.on('error', (err) => {
    console.error('Error', err);
    process.exit(1);
  });
  db.once('open', () => {
    console.log('Connected to MongoDB server.');
  });
}

// App Setup
// HTTP request logger with Standard Apache combined log output
app.use(morgan('combined'));
// Enable Cross Origin Resource Sharing
app.use(cors());
app.use(bodyParser.json({ type: '*/*' }));
// Helmet is a collection of 11 smaller middleware functions
// that set HTTP headers to secure Express apps
app.use(helmet());
// Static files
app.use(express.static(path.resolve(__dirname, 'public')));
// Bootstrap files
app.use(express.static(path.resolve(__dirname, 'node_modules/bootstrap/dist')));

app.use('/api', apiRoutes);

app.get('*', (req, res) => {
  res.sendFile(path.resolve(__dirname, 'public/index.html'));
});

module.exports = app;
