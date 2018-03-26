const router =  require('express').Router();
const bookCntrl= require('../controllers/book.controller');

router.route('/')
.post(bookCntrl.insert)  //Create
.get(bookCntrl.find);    //Read


router.route('/:isbn')
.post(bookCntrl.update)  //Update
.delete(bookCntrl.delete); //Delete


module.exports = router;