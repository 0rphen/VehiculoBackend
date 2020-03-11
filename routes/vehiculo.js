var express = require('express');
var VehiculoConsumer = require('../mongoConsumes/vehiculoConsumer');
var app = express();

var vehiculoConsumer = new VehiculoConsumer();

app.get('/', (req, res)=>{
    vehiculoConsumer.get().then(vehiculos => {
	return res.status(200).json({
    	    ok: true,
    	    body: vehiculos
    	});
    }).catch(err=>{
	return res.status(500).json({
    	    ok: false,
    	    mensaje: 'Error cargando Vehiculos',
    	    errors: err
    	});
    });
});

app.post('/', (req, res)=>{
    var body = req.body;
    vehiculoConsumer.post(body).then(vehiculoSave => {
	return res.status(201).json({
	    ok: true,
	    vehiculo: vehiculoSave
	});
    }).catch(err=>{
	return err.status(400).json({
	    ok: false,
	    mensaje: 'Error al crear vehiculo'
	});
    });
});

app.put('/:id', (req, res)=>{
    var userId = req.params.id;
    var body = req.body;
    vehiculoConsumer.put(body, userId).then(vehiculoSave=>{
	return res.status(200).json({
	    ok: true,
	    vehiculo: vehiculoSave
	});	
    }).catch(err=>{
	return res.status(500).json({
	    ok: false,
	    mensaje: 'Error actualizando vehiculo'
	});
    });
});

app.delete('/:id', (req, res)=>{
    var id = req.params.id;
    vehiculoConsumer.delete(id).then(vehiculoDelete=>{
	return res.status(200).json({
	    ok: true,
	    vehiculo: vehiculoDelete
	});	
    }).catch(err=>{
	return res.status(400).json({
	    ok: false,
	    mensaje: 'Error al eliminar vehiculo'
	});
    });
});

module.exports = app;
