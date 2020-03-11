var express = require('express');
//var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var vehiculoRoutes = require('./routes/vehiculo');
var todoRoutes = require('./routes/todos');

app.use('/vehiculo', vehiculoRoutes);
app.use('/todo', todoRoutes);

app.listen(3000, () => {
    console.log('Express server port 3000');
});

module.exports = app;
