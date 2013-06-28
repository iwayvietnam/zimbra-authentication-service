var express = require('express')
  , request = require('request')
  , url = require('url')
  , path = require('path')
  , fs = require('fs');
//  , urlparse = require('urlparse');

var app = express();

app.use(express.logger());

app.use(express.bodyParser());

app.use(function(req, res, next) {
  if (req.path === '/.well-known/browserid') {
    res.setHeader('Content-Type', 'application/json');
  }
  next();
});

app.post('/api/cert_key', function (req, res) {
  var certRequest = request.post('http://localhost:8080/cert_key').form(req.body);
  certRequest.pipe(res);
});

app.use(express.static(__dirname + '/static'));

app.listen(26600);