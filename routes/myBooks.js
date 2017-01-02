var express = require('express');
var router = express.Router();

var myBooksController = require('../controllers/myBooks');

router.get("/hello", function(req, res) {
    res.send("Hello World!");
});

router.get("/books", myBooksController.getMyBooks);
router.post("/book", myBooksController.registerMyBook);
router.delete("/book/:id", myBooksController.deleteMyBook);

module.exports = router;
