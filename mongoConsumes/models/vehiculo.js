var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var vehiculoSchema = new Schema({
    vehiculoId: {type: Number, required: [true, 'userId necesario']},
    model: {type: String, required: false},
    active: {type: Boolean, required: false},
    color: {type: String, required: false},
    modelYear: {type: Number, required: false}
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
