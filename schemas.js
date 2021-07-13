"use strict";
const mongoose = require("mongoose");

// /////////

// let reFromSchema = {};

// reFromSchema.booksSchema = new mongoose.Schema({
//   name: String,
//   description: String,
//   states: String,
//   img: String,
// });

// reFromSchema.userSchema = new mongoose.Schema({
//   email: String,
//   books: [reFromSchema.booksSchema],
// });

// reFromSchema.myBooksModel = mongoose.model("book", reFromSchema.booksSchema);
// reFromSchema.myUserModel = mongoose.model("user", reFromSchema.userSchema);

// module.exports = reFromSchema;

///////////////////////////////////

let booksSchema = new mongoose.Schema({
  name: String,
  description: String,
  states: String,
  img: String,
});

let userSchema = new mongoose.Schema({
  email: String,
  books: [booksSchema],
});

let myBooksModel = mongoose.model("book", booksSchema);
let myUserModel = mongoose.model("user", userSchema);

module.exports = myUserModel;
