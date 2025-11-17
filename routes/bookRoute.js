const { addBook, fetchBooks, fetchBook, updateBook, deleteBook } = require('../controller/bookController');
const { multer, storage,  upload } = require('../middleware/multerConfig');
const router = require('express').Router();

router.route('/books')
.post(upload.single('bookImage'), addBook)
.get(fetchBooks)

router.route("/books/:bookId")
.get(fetchBook)
.patch((upload.single('bookImage')), updateBook)
.delete(deleteBook)

module.exports = router;
