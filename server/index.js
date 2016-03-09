// Initialize the express framework
var express     = require('express'),
    path        = require('path'),
    mongoose    = require('mongoose'),
    bodyParser  = require('body-parser');

// Express setup 
var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));
app.use(express.static(path.join(__dirname, '../client')));

// Routes set up
var router = express.Router();

// Register the routing
app.use('/', router);

// Start mongodb
mongoose.connect('mongodb://localhost/cotacoes');
var db = mongoose.connection;
db.on('error', console.error);
db.once('open', startServer);

// Start up the server
function startServer() {
    var server = app.listen(3000, function () {
        var port = server.address().port;
        console.log('Listening on port ' + port);
    })
}