var mongoose = require('mongoose');

mongoose.connect('mongodb://localhost:27017/vehiculo',{useNewUrlParser:true, useUnifiedTopology: true}, (err, res)=>{
    if (err) throw err;
    console.log('Base de Datos: online');
});

module.exports = mongoose;
