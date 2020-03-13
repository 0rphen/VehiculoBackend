var Vehiculo = require('./models/vehiculo');
/**
 * La clase vehiculo requiere implementar los métodos get, post, put y delete
 */
module.exports = class VehiculoConsumer {
    constructor() { }

    get() {
        return Vehiculo.find({});
    }

    post(body) {
        var vehiculo = new Vehiculo({
            vehiculoId: body.vehiculoId,
            model: body.model,
            active: body.active,
            color: body.color,
            modelYear: body.modelYear
        });
        return vehiculo.save();
    }

    put(body, id) {
	return Vehiculo.findById(id).then(vehiculo => {
	    vehiculo.vehiculoId = body.vehiculoId;
	    vehiculo.model = body.model;
	    vehiculo.active = body.active;
	    vehiculo.color = body.color;
	    vehiculo.modelYear = body.modelYear;
            return vehiculo.save();
        });
    }

    delete(id) {
        return Vehiculo.findByIdAndRemove(id).exec();
    }
};
