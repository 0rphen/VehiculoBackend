var Vehiculo = require('./models/vehiculo');
/**
 * La clase vehiculo requiere implementar los métodos get, post, put y delete
 */
module.exports = class VehiculoConsumer {
    constructor() { }

    get() {
        return new Promise(
            function(resolve, reject) {
                Vehiculo.find({}, (err, vehiculos) => {
                    if (err)
                        reject(err);
                    resolve(vehiculos);
                });
            }
        );
    }

    post(body) {
        var vehiculo = new Vehiculo({
            vehiculoId: body.vehiculoId,
            model: body.model,
            active: body.active,
            color: body.color,
            modelYear: body.modelYear
        });
        return new Promise(
            function(resolve, reject) {
                vehiculo.save((err, vehiculoSave) => {
                    if (err)
                        reject(err);
                    resolve(vehiculoSave);
                });
            }
        );
    }

    put(body, id) {
        return new Promise(
            function(resolve, reject) {
                Vehiculo.findById(id, (err, vehiculo) => {
                    if (err)
                        reject(err);
                    vehiculo.vehiculoId = body.vehiculoId;
                    vehiculo.model = body.model;
                    vehiculo.active = body.active;
                    vehiculo.color = body.color;
                    vehiculo.modelYear = body.modelYear;
                    vehiculo.save((err, vehiculoSave) => {
                        if (err)
                            reject(err);
                        resolve(vehiculoSave);
                    });
                });
            }
        );
    }

    delete(id) {
        return new Promise(
            function(resolve, reject) {
                Vehiculo.findByIdAndRemove(id, (err, vehiculoDelete) => {
                    if (err)
                        reject(err);
                    resolve(vehiculoDelete);
                });
            }
        );
    }
}
