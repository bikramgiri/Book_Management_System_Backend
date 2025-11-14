const { addBook, fetchBooks, fetchBook } = require('../controller/bookController');
const router = require('express').Router();

router.route('/books')
.post(addBook)
.get(fetchBooks)

router.route("/books/:bookId")
.get(fetchBook)

module.exports = router;



// find = return array
// findById = return object