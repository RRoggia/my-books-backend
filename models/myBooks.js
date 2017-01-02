var mongoose = require("mongoose");

var myBookSchema = mongoose.Schema({
    title: {type: String, required: true},
    authors: [String],
    publisher: String,
    publishedDate: Date,
    pageCount: Number,
    categories: [String],
    language: String,
    rating: Number,
    type: String,
    readAt: Date
});

mongoose.model("MyBook", myBookSchema);