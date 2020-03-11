# VehiculoBackend

Servicio NodeJS Backend que consume una base de datos MongoDB y consume un endPoint

##Servicios Disponibles:

* /vehiculos {get, post, put, delete}

 con la estructura:
```
{
	"vehiculoId": numerico,
        "model": texto,
        "active": booleano,
        "color": texto,
        "modelYear": numerico
}
```

* /todos {get} filtrado por datos activos únicamente