const sequelize = require('./models').sequelize
const express = require('express');
const routes = require('./routes');
const books = require('./routes/books');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;

// Initialize App
const app = express();

// Serve static files in public folder
app.use('/static', express.static('public'))

// Use PUG for template engine
app.set('view engine', 'pug')

// Middleware for handling GET and POST requests
app.use(bodyParser.urlencoded({extended: false}));

// Access main router
app.use(routes);
app.use('/books', books);

// Create error object
app.use((req, res, next) => {
  const err = new Error(' I think you took a wrong turn!');
  err.status = 404;
  next(err); 
});

// Error handler
app.use((err, req, res, next) => { 
  console.dir('============================')
  console.dir('Sorry! An error has occured!');
  res.locals.error = err;
  res.status(err.status);
  res.render('error');
});

// Once database updates are complete, start listening to the server
sequelize.sync()
  .then(() => {
    app.listen(PORT, () => console.log('Application running on localhost:3000'));
});


