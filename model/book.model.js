const mongoose = require('mongoose');
const Schema = mongoose.Schema;

var bookSchema = new Schema(
    {
            title: {
                type: String,
                required: true,
                unique: true
            },
            author:{
                type: String,
                required: true,
                unique: false
            },
            isbn: {
                type:String,
                required: true,
                unique: true
            }
     },
    {
        timestamps: true
    }
);

module.exports = mongoose.model("book", bookSchema);
