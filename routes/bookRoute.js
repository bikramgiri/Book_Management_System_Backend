const { addBook, fetchBooks, fetchBook, updateBook, deleteBook } = require('../controller/bookController');
const router = require('express').Router();

router.route('/books')
.post(addBook)
.get(fetchBooks)

router.route("/books/:bookId")
.get(fetchBook)
.patch(updateBook)
.delete(deleteBook)

module.exports = router;
