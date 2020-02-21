var express = require('express');
var mongoose = require('mongoose');
var bodyParser = require('body-parser');
var https = require('https');

var options = {
    host: 'jsonplaceholder.typicode.com',
    path: '/todos',
};

var request = https.request(options, function (res) {
    var data = '';
    res.on('data', function (chunk) {
        data += chunk;
    });
    res.on('end', function () {
    });
});
request.on('error', function (e) {
    console.log(e.message);
});
request.end();

var app = express();

app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var vehiculoRoutes = require('./routes/vehiculo');

mongoose.connection.openUri('mongodb://localhost:27017/vehiculo', (err,res) => {
    if (err) throw err;
    console.log('Base de Datos: online');
});

app.use('/vehiculo', vehiculoRoutes);

app.listen(3000, () => {
    console.log('Express server port 3000');
});
