var express = require("express"),
    http = require("http"),
    bodyParser = require('body-parser');

var app = express();

app.use(express.static(__dirname + "/client"));
app.use(bodyParser.json());

require('./models/database');

var myBooksRouteApi = require('./routes/myBooks');
app.use('/myBooks', myBooksRouteApi);

var googleBooksRouteApi = require('./routes/googleBooks');
app.use('/googleBooks', googleBooksRouteApi);

http.createServer(app).listen(3000);