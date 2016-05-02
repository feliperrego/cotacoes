// Initialize the express framework
var express     = require('express');
var path        = require('path');
//var mongoose    = require('mongoose');
var bodyParser  = require('body-parser');
var compress    = require('compression');
var serveStatic = require('serve-static');
var app         = express();

// Project path
var projectDir = process.env.NODE_ENV == "prod" ? path.join(__dirname, '../dist') : path.join(__dirname, '../client');
var projectPort = process.env.NODE_ENV == "prod" ? 80 : 3000;

// Express setup
app.use(compress());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(serveStatic(projectDir));

// Register the routes
app.use('/api', require('./api/'));

app.all('/*', function (req, res) {
    res.sendFile(path.resolve(projectDir, 'index.html'));
});

// Start mongodb
//mongoose.connect('mongodb://localhost/cotacoes');
//var db = mongoose.connection;
//db.on('error', console.error);
//db.once('open', startServer);

// Start up the server
//function startServer() {
var server = app.listen(projectPort, function () {
    var port = server.address().port;
    console.log('Listening on port ' + port);
});
//}