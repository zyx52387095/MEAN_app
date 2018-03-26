const bookListModel = require("../model/user.booklist.model");

const find = function (req, res) {
    let searchCriteria = buildSearchCriteria(req);
     bookListModel.findOne(searchCriteria, function (err, retobj) {
        if (retobj){
            retobj=retobj.books;
        }
        sendResp(err, res, "Book list found", retobj);
    });
}
//does upsert - insert if does not exist or update
const update = function (req, res) {
    req.body.studentid= req.params.studentid;
    bookListModel.findOneAndUpdate({ "studentid": req.params.studentid},
        req.body, {upsert:true}, function (err, retobj) {
            sendResp(err, res, "Book updated", retobj);
        });
}

function buildSearchCriteria(req) {
    const searchCriteria = {};
    searchCriteria.studentid = req.params.studentid;
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

module.exports = { "find": find,  "update": update };