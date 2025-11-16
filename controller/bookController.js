const Book = require("../model/bookModel");

// Add Book
exports.addBook = async (req, res) => {
      const { bookName, bookPrice, autherName, bookDescription, isbnNumber, publication, publishedAt } = req.body;
      if (!bookName || !bookPrice || !autherName || !bookDescription || !isbnNumber || !publication || !publishedAt) {
            return res.status(400).json({ 
                  message: "bookName, bookPrice, autherName, bookDescription, isbnNumber, publication and publishedAt are required" 
            });
      }

      // validate book name length
      if (bookName.length < 2) {
            return res.status(400).json({ 
                  message: "Book name must be at least 2 characters long" 
            });
      }

      // Book name already exists check
      const existingBook = await Book.findOne({ bookName });
      if (existingBook) {
            return res.status(409).json({ 
                  message: "Book with this name already exists" 
            });
      }

      // validate book price is a positive number
      const price = parseFloat(bookPrice); 
      if (isNaN(price) || price <= 0) {
            return res.status(400).json({ 
                  message: "Book price must be a positive number" 
            });
      }

      // validate auther name length
      if (autherName.length < 3) {
            return res.status(400).json({ 
                  message: "Auther name must be at least 3 characters long" 
            });
      }

      // validate book description length
      if (bookDescription.length < 5) {
            return res.status(400).json({ 
                  message: "Book description must be at least 5 characters long" 
            });
      }

      // validate isbnNumber is positive number with length >4 like 45600, 12345, 78098
      if (!/^\d{4,}$/.test(isbnNumber)) {
            return res.status(400).json({ 
                  message: "ISBN Number must be a positive number with at least 4 digits" 
            });
      }
      

      // validate publishedAt is a valid year like YYYY-MM-DD format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(publishedAt)) {
            return res.status(400).json({ 
                  message: "Published date must be in YYYY-MM-DD format" 
            });
      }

      const newBook = await Book.create({
            bookName : bookName,
            bookPrice : parseFloat(bookPrice),
            autherName : autherName,
            bookDescription : bookDescription,
            isbnNumber : isbnNumber,
            publication : publication,
            publishedAt : publishedAt
      });

      return res.status(201).json({ 
            message: "Book added successfully",
            data: newBook
      });
}

// Fetch all books
exports.fetchBooks = async (req, res) => {
      const books = await Book.find({});

      if(books.length === 0){
            return res.status(404).json({ 
                  message: "No books found"
            });
      }

      return res.status(200).json({ 
            message: "Books fetched successfully",
            data: books
      });
}

// Fetch single book 
exports.fetchBook = async (req, res) => {
      // const bookId = req.params.id;
      const { bookId } = req.params;
      if(!bookId){
            return res.status(400).json({
                  message: "Book ID is required"
            });
      }

      const book = await Book.findById(bookId);
      if(!book){
            return res.status(404).json({
                  message: "Book not found"
            });
      }

      return res.status(200).json({
            message: "Book fetched successfully",
            data: book
      });
}

// Update Book
exports.updateBook = async (req, res) => {
      const bookId = req.params.bookId;
      if(!bookId){
            return res.status(400).json({
                  message: "Book ID is required"
            });
      }

      const book = await Book.findById(bookId)
      if(!book){
            return res.status(404).json({
                  message: "Book not found with this ID"
            });
      }

      const { bookName, bookPrice, autherName, bookDescription, isbnNumber, publication, publishedAt } = req.body;
      if (!bookName || !bookPrice || !autherName || !bookDescription || !isbnNumber || !publication || !publishedAt) {
            return res.status(400).json({ 
                  message: "bookName, bookPrice, autherName, bookDescription, isbnNumber, publication and publishedAt are required" 
            });
      }

      // validate book name length
      if (bookName.length < 2) {
            return res.status(400).json({ 
                  message: "Book name must be at least 2 characters long" 
            });
      }

      // // Book name already exists check
      // const existingBook = await Book.findOne({ bookName });
      // if (existingBook) {
      //       return res.status(409).json({ 
      //             message: "Book with this name already exists" 
      //       });
      // }

      // validate book price is a positive number
      const price = parseFloat(bookPrice); 
      if (isNaN(price) || price <= 0) {
            return res.status(400).json({ 
                  message: "Book price must be a positive number" 
            });
      }

      // validate auther name length
      if (autherName.length < 3) {
            return res.status(400).json({ 
                  message: "Auther name must be at least 3 characters long" 
            });
      }

      // validate book description length
      if (bookDescription.length < 5) {
            return res.status(400).json({ 
                  message: "Book description must be at least 5 characters long" 
            });
      }

      // validate isbnNumber is positive number with length >4 like 45600, 12345, 78098
      if (!/^\d{4,}$/.test(isbnNumber)) {
            return res.status(400).json({ 
                  message: "ISBN Number must be a positive number with at least 4 digits" 
            });
      }
      
      // validate publishedAt is a valid year like YYYY-MM-DD format
      const dateRegex = /^\d{4}-\d{2}-\d{2}$/;
      if (!dateRegex.test(publishedAt)) {
            return res.status(400).json({ 
                  message: "Published date must be in YYYY-MM-DD format" 
            });
      }

      const updatedBook = await Book.findByIdAndUpdate(bookId, {
            bookName : bookName,
            bookPrice : parseFloat(bookPrice),
            autherName : autherName,
            bookDescription : bookDescription,
            isbnNumber : isbnNumber,
            publication : publication,
            publishedAt : publishedAt
      }, { new: true });

      return res.status(200).json({
            message: "Book updated successfully",
            data: updatedBook
      });
}

// Delete Book
exports.deleteBook = async (req, res) => {
      const bookId = req.params.bookId;
      if(!bookId){
            return res.status(400).json({
                  message: "Book ID is required"
            });
      }

      const book = await Book.findById(bookId)
      if(!book){
            return res.status(404).json({
                  message: "Book not found with this ID"
            });
      }

      await Book.findByIdAndDelete(bookId);

      return res.status(200).json({
            message: "Book deleted successfully"
      });
}
