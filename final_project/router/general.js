const express = require('express');
let books = require("./booksdb.js");
let isValid = require("./auth_users.js").isValid;
let users = require("./auth_users.js").users;
const public_users = express.Router();


public_users.post("/register", (req, res) => {
    const { username, password } = req.body; 
    
    if (users[username]) {
      return res.status(400).json({ message: "User already exists" });
    }
  
    users.push({ username, password });
    
    res.send(`Customer successfully registred. Now you can login.`);
  });
  


// Get the book list available in the shop
public_users.get('/',function (req, res) {
  //Write your code here
  res.send(JSON.stringify(books, null, 4));
});

    
// Get book details based on ISBN
public_users.get('/isbn/:isbn', (req, res) => {
    const isbn = req.params.isbn;
    const book = books[isbn];
  
    if (book) {
      return res.status(200).json(book);
    } else {
      return res.status(404).json({ message: "Book not found" });
    }
  });
  
// Get book details based on author
public_users.get('/author/:author',function (req, res) {
    const author = req.params.author;
    const booksByAuthor = Object.values(books).filter(book => book.author === author);
  
    if (booksByAuthor.length > 0) {
      return res.status(200).json(booksByAuthor);
    } else {
      return res.status(404).json({ message: "Books by this author not found" });
    }
  });
// Get all books based on title
public_users.get('/title/:title',function (req, res) {
    const title = req.params.title;
    const booksByTitle = Object.values(books).filter(book => book.title === title);
  
    if (booksByTitle.length > 0) {
      return res.status(200).json(booksByTitle);
    } else {
      return res.status(404).json({ message: "Books with this title not found" });
    }
  });

//  Get book review
public_users.get('/review/:isbn',function (req, res) {
    const isbn = req.params.isbn;
    const book = books[isbn];
  
    if (book && book.reviews) {
      return res.status(200).json(book.reviews);
    } else {
      return res.status(404).json({ message: "Book reviews not found" });
    }
  });

module.exports.general = public_users;
