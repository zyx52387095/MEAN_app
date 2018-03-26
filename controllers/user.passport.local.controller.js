const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const user=require("../model/user.model");

passport.use(new LocalStrategy(
    function(username, password, done) {
        //find user name in DB and if found then compare pass
        user.findbyname(username, function(err, userobj){
            if(err) {
                return done(null, false, {message: 'Internal error'});
            }
            if(!userobj){
                return done(null, false, {message: 'Incorrect credentials.'});
            }
            //user found, now check password match
            userobj.checkPassword(password, function(err, isMatch){
                if(err) {
                    return done(null, false, {message: 'Internal error'});
                }    
                 if(isMatch){
                    return done(null, userobj, {message: 'Login ok'});
                } else {
                    return done(null, false, {message: 'Incorrect credentials.'});
                }
            });
        });
    }));
  
  module.exports=passport;