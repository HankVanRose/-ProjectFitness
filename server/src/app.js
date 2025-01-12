require('dotenv').config();
const apiRouter = require('./routers/api.router');
const morgan = require('morgan');
const cookieParser = require('cookie-parser');
const express = require('express');
const app = express();
const cors = require('cors');
 require('./hooks.js')

const { PORT } = process.env;

const corsConfig = {
  origin: ['http://localhost:5173', 'http://127.0.0.1:5173', 'http://127.0.0.1:5174', 'http://localhost:5174'],
  credentials: true,
};
app.use(cors(corsConfig));

app.use(cookieParser());
app.use(morgan('dev'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use('/api', apiRouter);

app.listen(PORT, () => {  console.log(`Server started at ${PORT} port`);
});