// Initialize the express framework
var express = require('express'),
    path = require('path'),
    //mongoose = require('mongoose'),
    bodyParser = require('body-parser');

// Express setup 
var app = express();
var projectDir = process.env.NODE_ENV == "prod" ? path.join(__dirname, '../dist') : path.join(__dirname, '../client');
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(projectDir));

// Routes set up
var router = express.Router();

var allCurrencies = [];
//allCurrencies["EUR"] = {code: "EUR", date: "2016-04-07T14:35:36.124Z", value: "2.7700"};

app.get('/api/currency/:code', function (req, res) {
    var currency = allCurrencies[req.params.code];
    //console.log(allCurrencies);
    res.json(currency);
});

app.post('/api/currency/', function (req, res) {
    var response,
        currency = allCurrencies[req.params.code];
    if (currency) {
        response = "Updating stored currency.";
        currency.value = req.body.value;
        currency.date = new Date();
    } else {
        response = "Storing new currency.";
        allCurrencies[req.body.code] = req.body;
    }
    res.json(response)
});

// Register the routing
app.all('/*', function(req, res) {
    res.sendFile(path.resolve(projectDir, 'index.html'));
});

// Start mongodb
//mongoose.connect('mongodb://localhost/cotacoes');
//var db = mongoose.connection;
//db.on('error', console.error);
//db.once('open', startServer);

// Start up the server
//function startServer() {
    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Listening on port ' + port);
    });
//}