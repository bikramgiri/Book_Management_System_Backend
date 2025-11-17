const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const bookSchema = new Schema({
      bookName : {
            type : String,
            unique: true,
            required : true
      },
      bookImage : {
            type : String,
            required : [true, 'Book image is required']
      },
      bookPrice : {
            type : Number,
            required : true
      },
      authorName : {
            type : String,
            required : true
      },
      bookDescription : {
            type : String,
            required : true
      },
      isbnNumber : {
            type : Number,
            required : true
      },
      publication : {
            type : String,
            required : true
      },
      publishedAt : {
            type : String,
            required : true
      }
});

const Book = mongoose.models.Book || mongoose.model("Book", bookSchema);
module.exports = Book;