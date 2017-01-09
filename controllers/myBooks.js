var mongoose = require("mongoose");
var myBook = mongoose.model("MyBook");

module.exports.getMyBooks = function (req, res) {

    var query = getFilledParameters(req.query);

    if(req.query.readAt && req.query.readAt.length > 0){
        if(req.query.readAt.length === 4){
            var oneYearLater = (parseInt(req.query.readAt) + 1).toString();
            query.readAt = { 
                $gte: new Date(req.query.readAt),
                $lt: new Date(oneYearLater)
            };
        }else{
            query.readAt = req.query.readAt;
        }
    }

    res.statusCode = 200;

	myBook.find(query, function (err, myBooks) {
        if(!myBooks.length){
            
            res.json({'error': 'No book found for this query.'});
            return;
        }
	   res.json(myBooks);
    });
}

module.exports.registerMyBook = function(req, res){

    if(!req.body.title || !req.body.type){
        res.statusCode = 400;
        res.json({'error': 'Title and Type are required to register a new book.'});
        return;
    }

    if(req.body.type !== 'BOOK' && req.body.type !== 'EBOOK'){
        res.statusCode = 400;
        res.json({'error': "Book Type should be 'BOOK' or 'EBOOK'."});
        return;
    }

    var myNewBook = new myBook({
        title: req.body.title,
        authors: req.body.authors,
        publisher: req.body.publisher,
        publishedDate: req.body.publishedDate,
        pageCount: req.body.pageCount,
        categories: req.body.categories,
        language: req.body.language,
        rating: req.body.rating,
        thumbnail: req.body.thumbnail,
        type: req.body.type,
        readAt: req.body.readAt
    });

    myNewBook.save(function (err) {
    	if (err !== null) {
            res.statusCode = 400;
            res.send({'error': err});
    	} else {

    	    myBook.findOne(myNewBook, function (err, createdBook) {
        		if (err !== null) {
                    res.statusCode = 400;
                    res.send({'error': err});
                    return;
        		}
                res.statusCode = 201;
        		res.json(createdBook);
                
    	    });
    	}
    });

};

module.exports.deleteMyBook = function(req, res){

    if(!req.params.id){
        res.statusCode = 400;
        res.send({'error': 'Missing book Id'});
    }

    myBook.findOneAndRemove({_id: req.params.id}, function(err, myDeletedBook){
        if (err !== null) {
            res.statusCode = 400;
            res.send({'error': err});
            return;
        }

        if(!myDeletedBook){
            res.statusCode = 404;
            res.send({'error': "Book was not found and therefore does not need to be deleted."});
            return;   
        }

        res.statusCode = 204;
        res.send();
    });

};

module.exports.updateMyBook = function(req, res){
    if(!req.params.id){
        res.statusCode = 400;
        res.send({'error': 'Missing book Id'});
    }

    var attributesToUpdate = getFilledParameters(req.body);  

    myBook.findOneAndUpdate({_id: req.params.id}, attributesToUpdate, function(err, bookUpdated){
        if (err !== null) {
            res.statusCode = 400;
            res.send({'error': err});
            return;
        }

        if(!bookUpdated){
            res.statusCode = 404;
            res.send({'error': "Book was not found, no action was taken."});
            return;   
        }

        res.statusCode = 200;
        res.json(bookUpdated);
    });
};

function getFilledParameters(parameters){

    var filledParameters = {};

    if(parameters.title && parameters.title.length > 0){
        filledParameters.title = parameters.title;
    }

    if(parameters.authors && parameters.authors.length > 0){
        filledParameters.authors = parameters.authors;
    }

    if(parameters.publisher && parameters.publisher.length > 0){
        filledParameters.publisher = parameters.publisher;
    }

    if(parameters.publishedDate && parameters.publishedDate.length > 0){
        filledParameters.publishedDate = parameters.publishedDate;
    }

    if(parameters.pageCount && parameters.pageCount.length > 0){
        filledParameters.pageCount = parameters.pageCount;
    }

    if(parameters.categories && parameters.categories.length > 0){
        filledParameters.categories = parameters.categories;
    }

    if(parameters.language && parameters.language.length > 0){
        filledParameters.language = parameters.language;
    }

    if(parameters.rating && parameters.rating.length > 0){
        filledParameters.rating = parameters.rating;
    }

    if(parameters.thumbnail && parameters.thumbnail.length > 0){
        filledParameters.thumbnail = parameters.thumbnail;
    }

    if(parameters.type && parameters.type.length > 0){
        filledParameters.type = parameters.type;
    }

    return filledParameters;

}