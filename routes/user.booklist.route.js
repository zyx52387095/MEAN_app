const router = require('express').Router();
const bookListCntrl = require('../controllers/user.booklist.controller');
const authsvc = require('../access_auth');

//for every request coming to this route, check if there is valid token or return 401
router.use('/', function (req, res, next) {
    if (authsvc.verifyToken(req.query.token)) {
        next();
    } else {
        return res.status(401).json({
            title: 'Not Authenticated',
            error: err
        });
    }
});


router.route('/:studentid')
    .post(bookListCntrl.update)  //Update
    .get(bookListCntrl.find);    //Read

module.exports = router;