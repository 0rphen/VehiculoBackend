var express = require('express');
var app = express();

var Vehiculo = require('../models/vehiculo');

app.get('/', (req, res)=>{
    Vehiculo.find({}, (err, vehiculos)=>{
    	if (err)
    	    return res.status(500).json({
    		ok: false,
    		mensaje: 'Error cargando Vehiculos',
    		errors: err
    	    });
    	return res.status(200).json({
    	    ok: true,
    	    body: vehiculos
    	});
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    var vehiculo = new Vehiculo({
	userId: body.userId,
	id: body.id,
	title: body.title,
	completed: body.completed
    });
    vehiculo.save((err, vehiculoSave) => {
	if (err)
	    return err.status(400).json({
		ok: false,
		mensaje: 'Error al crear vehiculo'
	    });
	return res.status(201).json({
	    ok: true,
	    vehiculo: vehiculoSave
	});
    });
});

app.put('/:id', (req, res)=>{
    var userId = req.params.id;
    var body = req.body;
    Vehiculo.findById(userId, (err, vehiculo) =>{
	if (err)
	    return res.status(500).json({
		ok: false,
		mensaje: 'Error cargando vehiculo'
	    });
	vehiculo.userId = body.userId;
	vehiculo.id = body.id;
	vehiculo.title = body.title;
	vehiculo.completed = body.completed;
	vehiculo.save((err, vehiculoSave) => {
	    if (err)
		return res.status(400).json({
		    ok: false,
		    mensaje: 'Error al actualizar vehiculo'
		});
	    return res.status(200).json({
		ok: true,
		vehiculo: vehiculoSave
	    });
	});
	return true;
  });
});

app.delete('/:id', (req, res)=>{
    var id = req.params.id;
    Vehiculo.findByIdAndRemove(id, (err, vehiculoDelete) => {
	if (err)
	    return res.status(400).json({
		ok: false,
		mensaje: 'Error al eliminar vehiculo'
	    });
	return res.status(200).json({
	    ok: true,
	    vehiculo: vehiculoDelete
	});
    });
});

module.exports = app;
