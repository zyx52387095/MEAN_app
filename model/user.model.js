const mongoose = require('mongoose');
const schema = mongoose.Schema;
const crypto = require('crypto');


const salt = '8nkjfdoi@$f93_039_=90ldkv';  //salt should be created through some other mechanism

const userschema = new schema({
    username: {
        type: String,
        unique:true,
        required: true,
        minlength: 6
    },
    studentid: {
        type: Number,
        required: true,
        unique: true,
        min: 1000
    },
    password: {
        type: String,
        required: true,
        minlength: 6
    },
    email: {
        type: String
    },
    fullname: {
        type: String,
        required: true
    },
    provider: String,
    providerId: String,
    providerData: {}

});

userschema.statics.register = function (user, cbfn) {
    user.password = doHash(user.password);
    user.save(cbfn);
}

userschema.statics.findbyname = function(name, cbfn){
    usermodel.findOne({username:name},cbfn);
}


userschema.methods.checkPassword = function (password, cbfn) {
    if (this.password === doHash(password)) {
        cbfn(null, true);
    } else {
        cbfn(new Error('user nameor password does not match', false));
    }
}


function doHash(val) {
    // 10000 - iteration, 64-key length, then convert to base64
    return crypto.pbkdf2Sync(val, salt, 10000, 64, 'sha512').toString('base64');
}

var usermodel = mongoose.model("user", userschema);
module.exports = usermodel;