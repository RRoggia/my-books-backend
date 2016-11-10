var express = require("express"),
    http = require("http"),
    mongoose = require("mongoose"),
    app = express(),
    mongoUrl = "mongodb://localhost/books";

app.use(express.static(__dirname + "/client"));
app.use(express.bodyParser());

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

var bookSchema = mongoose.Schema({
    title: {type: String, required: true},
    subtitle: String,
    authors: [String],
    publisher: String,
    publishedDate: Date,
    pageCount: Number,
    categories: [String],
    language: String,
    rating: Number,
    type: String
});

var Book = mongoose.model("Book", bookSchema);

http.createServer(app).listen(3000);

app.get("/hello", function(req, res) {
    res.send("Hello World!");
});

app.get("/books", function (req, res) {
    Book.find({}, function (err, books) {
	   res.json(books);
    });
});

app.post("/book", function (req, res) {
    var newBook = new Book({
        title: req.body.title,
        subtitle: req.body.subtitle,
        authors: req.body.authors,
        publisher: req.body.publisher,
        publishedDate: req.body.publishedDate,
        pageCount: req.body.pageCount,
        categories: req.body.categories,
        language: req.body.language,
        rating: req.body.rating,
        type: req.body.type
    });

    newBook.save(function (err, result) {
    	if (err !== null) {
    	    console.log(err);
            res.statusCode = 400;
            res.send("Another error");
    	} else {

    	    Book.find({title: req.body.title}, function (err, result) {
    		if (err !== null) {
                res.statusCode = 400;
                res.send("ERROR");
    		}
    		res.json(result[0]);
    	    });
    	}
    });
});

var books = require('google-books-search');


app.get("/google/books", function(req, res) {

    var options = {
        field: req.query.queryType,
        lang: 'pt',
        limit: 40
    };

    books.search(req.query.queryValue ,options ,function(error, results) {
        if ( ! error ) {
            console.log(results);
        } else {
            console.log(error);
        }

        var books = [];

        results.forEach(function(book){
            var googleBook = {
                title: book.title,
                authors: book.authors,
                publisher: book.publisher,
                publishedDate: book.publishedDate,
                pageCount: book.pageCount,
                categories: book.categories,
                language: book.language,
                thumbnail: book.thumbnail,
                type: book.printType
            }
            books.push(googleBook);
        });

        res.json(books);

    });
});