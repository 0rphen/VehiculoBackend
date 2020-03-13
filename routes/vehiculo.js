var express = require('express');
var VehiculoConsumer = require('../mongoConsumes/vehiculoConsumer');
var Schema = require('validate');

var app = express();

var vehiculoConsumer = new VehiculoConsumer();

const vehiculoSchema = new Schema({
    vehiculoId: {
	type: String,
	required: true
    },
    model: {
	type: String,
	required: false
    },
    active: {
	type: Boolean,
	required: false
    },
    color: {
	type: String,
	required: false
    },
    modelYear: {
	type: Number,
	required: false
    }
});

const idSchema = new Schema({
    id: {
	type: String,
	required:true
    }
});

app.get('/', (req, res)=>{
    vehiculoConsumer.get().then(vehiculos => {
	return res.status(200).send(vehiculos);
    }).catch(err=>{
	return res.status(500).json({
    	    mensaje: 'Error cargando Vehiculos',
    	    errors: err
    	});
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var error = vehiculoSchema.validate(body);
    if (error) {
	return res.status(400).send(error.errors.message);
    } else {
	return vehiculoConsumer.post(body).then(vehiculoSave => {
	    return res.status(201).send(vehiculoSave);
	}).catch(err=>{
	    return res.status(400).json({
		mensaje: 'Error al crear vehiculo',
		errors:err
	    });
	});
    }
});

app.put('/:id', (req, res)=>{
    var userId = req.params.id;
    var body = req.body;
    var error = vehiculoSchema.validate(body) || idSchema.validate(userId);
    if (error) {
	return res.status(400).send(error);
    } else {
	return vehiculoConsumer.put(body, userId).then(vehiculoSave=>{
	    return res.status(200).json(vehiculoSave);	
	}).catch(err=>{
	    return res.status(500).json({
		mensaje: 'Error actualizando vehiculo',
		errors: err
	    });
	});
    }
});

app.delete('/:id', (req, res)=>{
    var id = req.params.id;
    var error = idSchema.validate(id);
    if (error){
	return res.status(400).send(error);
    } else {
	return vehiculoConsumer.delete(id).then(vehiculoDelete=>{
	    return res.status(200).json(vehiculoDelete);	
	}).catch(err=>{
	    return res.status(400).json({
		mensaje: 'Error al eliminar vehiculo',
		errors: err
	    });
	});
    }
});

module.exports = app;
