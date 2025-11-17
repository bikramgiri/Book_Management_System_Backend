const Book = require("../model/bookModel");
const fs = require("fs");

// Add Book
exports.addBook = async (req, res) => {
      const file = req.file;

      if (!file) {
        return res.status(400).json({
          message: "Product image is required",
       });
      }

      // if (!file) {
      //       productImage = "No image uploaded"; // If no file is uploaded, set a default message
      // } else {
      //       productImage = process.env.BACKEND_URL + '/storage/' + file.filename; // Get the filename from the uploaded file
      // }

      // *OR

      const bookImage = process.env.BACKEND_URL + "/storage/" + file.filename; // Get the filename from the uploaded file

      const { bookName, bookPrice, authorName, bookDescription, isbnNumber, publication, publishedAt } = req.body;
      // if (!bookName || !bookImage || !bookPrice || !authorName || !bookDescription || !isbnNumber || !publication || !publishedAt) {
      //       return res.status(400).json({ 
      //             message: "bookName, bookImage, bookPrice, authorName, bookDescription, isbnNumber, publication and publishedAt are required" 
      //       });
      // }

      // validate book name length must 2 characters or more
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

      // validate product image is already exists
      const existingImage = await Book.findOne({ bookImage });
      if (existingImage) {
            return res.status(400).json({
                  message: "Book with this image already exists",
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
      if (authorName.length < 3) { // at least 3 characters
            return res.status(400).json({ 
                  message: "Author name must be at least 3 characters long" 
            });
      }

      // validate book description length
      if (bookDescription.length < 5) {
            return res.status(400).json({ 
                  message: "Book description must be at least 5 characters long" 
            });
      }

      // validate isbnNumber is already exists
      const existingISBN = await Book.findOne({ isbnNumber });
      if (existingISBN) {
            return res.status(400).json({
                  message: "Book with this ISBN Number already exists"
            });
      }

      // validate isbnNumber is positive number with length >4 like 45600, 12345, 78098
      if (!/^\d{13,}$/.test(isbnNumber)) {
            return res.status(400).json({ 
                  message: "ISBN Number must be a positive number with at least 13 digits" 
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
            bookImage : bookImage,
            bookPrice : parseFloat(bookPrice),
            authorName : authorName,
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

      let bookImage = book.bookImage; // http://localhost:3000/storage/AI.jpeg

      const { bookName, bookPrice, authorName, bookDescription, isbnNumber, publication, publishedAt } = req.body;
      if (!bookName || !bookImage || !bookPrice || !authorName || !bookDescription || !isbnNumber || !publication || !publishedAt) {
            return res.status(400).json({ 
                  message: "bookName, bookImage, bookPrice, authorName, bookDescription, isbnNumber, publication and publishedAt are required" 
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

      // validate author name length
      if (authorName.length < 3) {
            return res.status(400).json({ 
                  message: "Author name must be at least 3 characters long" 
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

      if (req.file && req.file.filename) {
        const oldBookImage = book.bookImage;
        const lengthToCut = "http://localhost:3000/storage/".length;
        const finalImagePathAfterCut = oldBookImage.slice(lengthToCut);
        fs.unlink("./storage/" + finalImagePathAfterCut, (err) => {
          if (err) {
            console.error("Error deleting old image:", err);
          } else {
            console.log("Old image deleted successfully");
          }
       });
       bookImage = process.env.BACKEND_URL + "/storage/" + req.file.filename;
      }

      const updatedBook = await Book.findByIdAndUpdate(bookId, {
            bookName : bookName,
            bookImage : bookImage,
            bookPrice : parseFloat(bookPrice),
            authorName : authorName,
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

      const oldBookImage = book.bookImage; // http://localhost:3000/storage/AI.jpeg
      const lengthToCut = "http://localhost:3000/storage/".length;
      const finalImagePathAfterCut = oldBookImage.slice(lengthToCut);
      // Delete the image file from Storage folder
      fs.unlink("./storage/" + finalImagePathAfterCut, (err) => {
       if (err) {
         console.error("Error deleting image:", err);
       } else {
         console.log("Image deleted successfully");
       }
      });

      await Book.findByIdAndDelete(bookId);

      return res.status(200).json({
            message: "Book deleted successfully"
      });
}
