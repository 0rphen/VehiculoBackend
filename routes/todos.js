var express = require('express');
var https = require('https');
var Request = require("request");
var app = express();

app.get('/', (req, res)=>{
    let data = new Promise(
	function(resolve, reject) {
	    Request.get("http://jsonplaceholder.typicode.com/todos", (error, response, body) => {
		if(error) {
		    reject(error);
		}
		body = JSON.parse(body);
		resolve(body.filter(element => element.completed == true));
	    });
	}
    );
    data.then((body)=>{
	return res.status(201).json({
	    ok: true,
	    data: body
	});
    }).catch((err)=>{
	return res.status(500).json({
	    ok:false,
	    message: err
	});
    });
});

module.exports = app;
