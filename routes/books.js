const express = require('express');
const router = express.Router();
const Book = require('../models').Book;


// Show list of all books
router.get('/', (req, res) => {
  Book.findAll().then(books => {
    res.render("index", {books});
  }).catch(err => console.log(err));
});


// Display from to create book
router.get('/new', (req, res) => {
  res.render('new-book', {book: {}});
});


// Add book to database
router.post('/new', (req, res) => {
  Book.create(req.body).then(() => {
    res.redirect('/books');
     }).catch(error => {
      if(error.name === "SequelizeValidationError") {
        res.render("new-book", {book: Book.build(req.body), errors: error.errors});
      } else {
        throw error;
      };
  }).catch(error => {
      res.send(500, error);
  });
});


// Display book information on main page
router.get("/:id", (req, res) => {
 Book.findByPk(req.params.id).then(book => {
   if(book){
     res.render('update-book', {book});
   }else{
     res.render('page-not-found')
    //  res.send(404)
    //  res.render('page-not-found')
   }
 }).catch(error => {
   res.send(500, error)
 })
});



// Update book changes to database
router.post("/:id", (req, res) => {
  Book.findByPk(req.params.id).then(book => {
    if(book) {
      return book.update(req.body);
    } else {
      res.send(404);
    }
  }).then(() => {
    res.redirect("/books");        
  }).catch(error => {
      if(error.name === "SequelizeValidationError") {
        let book = Book.build(req.body);
        book.id = req.params.id;
        res.render('update-book', {book, errors: error.errors});
      } else {
        throw error;
      };
  }).catch(error => {
      res.send(500, error);
   });
});


// Delete book
router.post("/:id/delete", (req, res) => {
  Book.findByPk(req.params.id).then(book => {  
    if(book) {
      return book.destroy();
    } else {
      res.send(404);
    }
  }).then(() => {
    res.redirect("/books");    
  }).catch(error => {
      res.send(500, error);
   });
});





module.exports = router;














