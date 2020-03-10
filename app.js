var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var vehiculoRoutes = require('./routes/vehiculo');
var todoRoutes = require('./routes/todos');

mongoose.connection.openUri('mongodb://localhost:27017/vehiculo', (err,res) => {
    if (err) throw err;
    console.log('Base de Datos: online');
});

app.use('/vehiculo', vehiculoRoutes);
app.use('/todo', todoRoutes);

app.listen(3000, () => {
    console.log('Express server port 3000');
});
