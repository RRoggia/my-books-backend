var mongoose = require("mongoose");
var mongoUrl = "mongodb://localhost/books";

mongoose.connect(mongoUrl);

mongoose.connection.on('connected', function(){
    console.log('Mongoose connected to ' + mongoUrl);
});

mongoose.connection.on('error', function(error){
    console.log('renan:' + error);
    console.log('Mongoose connection error:' + error);
});

mongoose.connection.on('disconnected', function(){
    console.log('Mongoose disconected');
});

require('./myBooks');