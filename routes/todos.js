var express = require('express');
var https = require('https');
var request = require("request-promise");
var app = express();

app.get('/', (req, res)=>{
    try {
	request("http://jsonplaceholder.typicode.com/todos")
	    .then((body)=>{
		return res.status(200).send(body);
	    })
	    .catch((err)=>{
		return res.status(500).send(err);
	    });
    } catch(err) {
	return res.status(500).send(err);
    }
});

module.exports = app;
