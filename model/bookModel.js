const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
      bookName : {
            type : String,
            unique: true
      },
      bookPrice : {
            type : String
      },
      autherName : {
            type : String
      },
      bookImage : {
            type : String
      },
      isbnNumber : {
            type : String
      },
      publication : {
            type : String
      },
      publishedAt : {
            type : String
      }

});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
module.exports = Book;