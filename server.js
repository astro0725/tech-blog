// load environment variables from .env file
require('dotenv').config();
// import express framework
const express = require('express');
// import express-session for session management
const session = require('express-session');
// import connect-session-sequelize to store session data in sequelize
const SequelizeStore = require('connect-session-sequelize')(session.Store);
// import db object from models folder to interact with the database
const dbTech = require('./models')
// import cookieparser to parse cookies from the request headers
const cookieParser = require('cookie-parser');
// import express-handlebars for view rendering
const exphbs = require('express-handlebars');
//import moment to format date rendering in frontend
const moment = require('moment');

// create a handlebars instance with default layout and partials directory configuration
const hbs = exphbs.create({ 
  defaultLayout: 'main',
  partialsDir: ['views/partials/'],
  helpers: {
    formatDate: function(date) {
      return moment(date).format('DD/MM/YYYY');
    }
  }
});

// create an express application
const app = express();
// get the port number from environment variables
const PORT = process.env.PORT;

// middleware to parse urlencoded bodies (as sent by HTML forms)
app.use(express.urlencoded({ extended: true }));

// set up session middleware with session storage, secret, and cookie configuration
app.use(session({
  secret: process.env.SESSION_SECRET, // secret used to sign the session ID cookie
  store: new SequelizeStore({ // configure sequelize store to save session info in db
    db: dbTech,
    model: 'Sessions', // specify the model name for sessions
    table: 'Sessions', // specify the table name for sessions
  }),
  resave: false, // don't save session if unmodified
  saveUninitialized: false, // don't create session until something stored
  cookie: { secure: 'auto', httpOnly: true, maxAge: 60000*100 } // cookie settings
}));

// set up handlebars as the view engine
app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

// serve static files from the public directory
app.use(express.static('public'));
// middleware to parse JSON bodies
app.use(express.json());

// use cookie parser middleware to parse cookies from the request headers
app.use(cookieParser());

// import routes from the routes directory and use them
const routes = require('./routes/index');
app.use('/', routes);

// start the server on the specified port and log the listening message
app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});