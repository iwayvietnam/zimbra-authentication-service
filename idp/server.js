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

app.get('/api/whoami', function(req, res) {
  res.json({ user: req.session.user || null });
});

app.get('/api/auth_status', function(req, res) {
  res.send(JSON.stringify({
    logged_in_email: req.session.user || null,
  }));
});

app.get('/api/signout', function(req, res) {
  req.session.reset();
  res.writeHead(200);
  res.end();
});

app.post('/api/signin', function(req, res) {
  if (!req.body.user || !req.body.pass) {
    res.writeHead(400);
    return res.end();
  }

  var normalizedUser = req.body.user.toLowerCase();
  req.session.user = normalizedUser;

  res.writeHead(200);
  res.end();
});

app.post('/api/haveuser', function(req, res) {
  // optional
  // 3rd party implementation
});

app.post('/api/cert_key', function (req, res) {
  var certRequest = request.post('http://localhost:8080/cert_key').form(req.body);
  certRequest.pipe(res);
});

app.use(express.static(__dirname + '/static'));

app.listen(26600);