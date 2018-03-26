const user=require("../model/user.model");


require('./user.passport.local.controller');

const register = function (req, res){

    //create an instance of the model
    var newUser = new user({
        username:req.body.username,
        email: req.body.email,
         password: req.body.password,
        studentid: req.body.studentid,
        fullname:req.body.fullname
    });

    user.register(newUser, function(err, user){
        if (err){
            res.status(500).json({
                message:  err.message,
                obj: null,
                token:null
            });
        }else{
             res.status(201).json({
                message: 'User registered',
                obj: user
             });
         }
     });
};
module.exports = {"register":register};