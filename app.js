import express from 'express';
import logger from 'morgan';

var app = express();

// Middleware para procesar JSON en el cuerpo de las solicitudes
app.use(express.json());

// Logger
app.use(logger('dev'));

// Rutas
import indexRouter from './routes/index.js';
app.use('/api', indexRouter);

import cors from 'cors';
app.use(cors());

export default app;
