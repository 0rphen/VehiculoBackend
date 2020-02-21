var mongoose = require('mongoose');

var Schema = mongoose.Schema;

var vehiculoSchema = new Schema({
    userId: {type: Number, required: [true, 'userId necesario']},
    id: {type: Number, required: [true, 'id necesario']},
    title: {type: String, required: false},
    completed: {type: Boolean, required: false}
});

module.exports = mongoose.model('Vehiculo', vehiculoSchema);
