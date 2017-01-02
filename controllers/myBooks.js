var mongoose = require("mongoose");
var myBook = mongoose.model("MyBook");

module.exports.getMyBooks = function (req, res) {

    var query = {};

    if(req.query.title && req.query.title.length > 0){
        query.title = req.query.title;
    }

    if(req.query.authors && req.query.authors.length > 0){
        query.authors = req.query.authors;
    }

    if(req.query.publisher && req.query.publisher.length > 0){
        query.publisher = req.query.publisher;
    }

    if(req.query.publishedDate && req.query.publishedDate.length > 0){
        query.publishedDate = req.query.publishedDate;
    }

    if(req.query.pageCount && req.query.pageCount.length > 0){
        query.pageCount = req.query.pageCount;
    }

    if(req.query.categories && req.query.categories.length > 0){
        query.categories = req.query.categories;
    }

    if(req.query.language && req.query.language.length > 0){
        query.language = req.query.language;
    }

    if(req.query.rating && req.query.rating.length > 0){
        query.rating = req.query.rating;
    }

    if(req.query.type && req.query.type.length > 0){
        query.type = req.query.type;
    }

	myBook.find(query, function (err, myBooks) {
        if(!myBooks.length){
            res.json({'error': 'No book found for this query.'});
            res.status = 204;
            return;
        }

	   res.json(myBooks);
    });
}

module.exports.registerMyBook = function(req, res){

	console.log(req.body);
    var myNewBook = new myBook({
        title: req.body.title,
        authors: req.body.authors,
        publisher: req.body.publisher,
        publishedDate: req.body.publishedDate,
        pageCount: req.body.pageCount,
        categories: req.body.categories,
        language: req.body.language,
        rating: req.body.rating,
        type: req.body.type
    });

    myNewBook.save(function (err, result) {
    	if (err !== null) {
    	    console.log(err);
            res.statusCode = 400;
            res.send("Another error");
    	} else {
            console.log('workd');

    	    myBook.find({title: req.body.title}, function (err, result) {
    		if (err !== null) {
                res.statusCode = 400;
                res.send("ERROR");
    		}
    		res.json(result[0]);
    	    });
    	}
    });

}