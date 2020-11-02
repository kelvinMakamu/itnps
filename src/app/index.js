const express     = require('express');
const bodyParser  = require('body-parser');
const morgan      = require('morgan');
const helmet      = require('helmet');
const cors        = require('cors');
const CONFIG      = require('../configs/config');
const CONNECT     = require('../models/connect');

const middlewares = [
    helmet(),
    morgan('dev'),
    bodyParser.json(),
    cors(CONFIG.CORS_OPTIONS),
    bodyParser.urlencoded({ extended: true })
];

const app  = express();

app.use(middlewares);

app.get('/',(req,res) => {
    res.json({message: 'Welcome to The beginning'});
});

app.listen(CONFIG.SERVER_PORT,() => {
    console.log(`The server started on port ${CONFIG.SERVER_PORT}`);
});