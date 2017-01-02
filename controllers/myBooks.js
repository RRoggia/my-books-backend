var mongoose = require("mongoose");
var myBook = mongoose.model("MyBook");

module.exports.getMyBooks = function (req, res) {
	myBook.find({}, function (err, myBooks) {
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