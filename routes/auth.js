const express = require('express');
const router = express.Router();
const passport =require('passport');
const authsvc = require('../access_auth');
const userController = require('../controllers/user.controller');

router.post('/register', userController.register);

router.post('/login', function (req, res, next) {
    passport.authenticate('local', {session: false}, (err, user, info) => {
        if (err || !user) {
            return res.status(400).json({
                message: 'No user',
                user   : user
            });
        }
       req.login(user, {session: false}, (err) => {
           if (err) {
               res.send(err);
           }
           // generate a signed son web token with the contents of user object and return it in the response
           const token = authsvc.createToken({user:user.username});
           user.password='';
           return res.json({user,token});
        });
    })(req, res);
});
module.exports = router;