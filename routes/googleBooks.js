var express = require('express');
var router = express.Router();

var googleBooksController = require('../controllers/googleBooks');

router.get("/books", googleBooksController.getBooksFromGoogle);

module.exports = router;