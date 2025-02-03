var express = require('express');
var logger = require('morgan');

var app = express();

// Middleware para procesar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Logger
app.use(logger('dev'));

// Rutas
var indexRouter = require('./routes/index');
app.use('/api', indexRouter);

const cors = require('cors');
app.use(cors());

module.exports = app;
