const mongoose = require('mongoose');
const schema = mongoose.Schema;

/*
    booklist is to keep track of books the user has added to his list
*/
const booklist = new schema({
    studentid: {
        type: Number,
        required: true
    },
    books: [{
        title: String,
        author: String,
        isbn: String
    }]
},
    {
        timestamps: true
    }
);
module.exports = mongoose.model("userbooklist", booklist);