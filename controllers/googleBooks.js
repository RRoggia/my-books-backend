var books = require('google-books-search');

module.exports.getBooksFromGoogle =  function(req, res) {

    var options = {
        field: req.query.queryType,
        lang: 'pt',
        limit: 40 
    };

    books.search(req.query.queryValue ,options ,function(error, results) {
        if (error) {
            console.log(error);
            return;
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
};