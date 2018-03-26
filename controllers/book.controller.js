const bookModel = require("../model/book.model");

const insert = function (req, res) {
    bookModel.create(req.body, function (err, retobj) {
        sendResp(err, res, "Book added", retobj);
    });

}
const find = function (req, res) {
    let searchCriteria = buildSearchCriteria(req);
    bookModel.find(searchCriteria, function (err, retobj) {
        sendResp(err, res, "Books found", retobj);
    });
}

const del = function (req, res) {
    bookModel.deleteOne({ isbn: req.params.isbn }, function (err, retobj) {
        sendResp(err, res, "Book removed", retobj);
    });
}

const update = function (req, res) {
    bookModel.findOneAndUpdate({ isbn: req.params.isbn }, req.body, function (err, retobj) {
        sendResp(err, res, "Book updated", retobj);
    });
}

function buildSearchCriteria(req) {
    const searchCriteria = {};
    //if criteria fo unique serach is specified then use that
    if (req.query.isbn) {
        searchCriteria.isbn = req.query.isbn;
    } else if (req.query.title) {
        searchCriteria.title = req.query.title;
    } else if (req.query.author){
        searchCriteria.author = req.query.author;
    }
    return searchCriteria;
}

function sendResp(err, res, message, retobj) {
    const ret = {};
    if (err) {
        ret.message = err.message;
        res.status(400).json(ret);
    } else {
        ret.message = message;
        ret.data = retobj;
        res.status(201).json(ret);
    }
}
module.exports = { "insert": insert, "find": find, "delete": del, "update": update };
