require('module-alias/register');

require('dotenv').config();

const express       = require('express');
const path          = require('path');
const bodyParser    = require('body-parser');
const morgan        = require('morgan');

const api           = require('./routes/api');
const web           = require('./routes/web');

const app           = express();

// view engine setup
app.set('views', path.join(__dirname, 'resources/views'));
app.set('view engine', 'ejs');

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(morgan('dev'));

// Routes
app.use('/api', api);
app.use(web);

module.exports = app;