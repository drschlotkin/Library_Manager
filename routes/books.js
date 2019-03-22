const express = require('express')
const router = express.Router()
const Book = require('../models').Book


// GET book listing
router.get('/', (req, res) => {
  Book.findAll().then(book => {
    res.render("index", {book: book})
  }).catch(err => console.log(err))
})


module.exports = router;


/* I have this moved to the side until I get some data back from the database */


// router.get('/', (req, res, next) => {
//   Book.findAll({order: [["createdAt", "DESC"]]}).then(function(book){
//     res.render("index", {book: book, title: "My Awesome Blog" });
//   }).catch(function(error){
//     res.send(500, error)
//   })
// })

// POST create book
// router.post('/', function(req, res, next){
//   Book.create(req.body).then(function(book){
//     res.redirect('/books' + book.id)
//      }).catch(function(error){
//       if(error.name === "SequelizeValidationError") {
//         res.render("new-book", {article: Article.build(req.body), errors: error.errors, title: "New Book"})
//       } else {
//         throw error;
//       }
//   }).catch(function(error){
//       res.send(500, error);
//   })
// });

// Create new book
// router.get('/new', (req, res) => {
//   res.render('new-book', {book:{}, title: "New Book"})
// })

// GET individual article
// router.get("/:id", function(req, res, next){
//   Book.findById(req.params.id).then(function(books){
//     res.render("index", {books: books, title: books.title})
//   })
// })






