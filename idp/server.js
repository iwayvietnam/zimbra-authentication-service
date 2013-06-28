var express = require('express')
  , url = require('url')
  , path = require('path')
  , fs = require('fs');
//  , urlparse = require('urlparse');

var app = express();

app.use(function(req, res, next) {
  if (req.path === '/.well-known/browserid') {
    res.setHeader('Content-Type', 'application/json');
  }
  next();
});



app.use(express.static(__dirname + '/static'));

app.listen(26600);