require('dotenv').config();
const express = require('express');
const session = require('express-session');
const SequelizeStore = require('connect-session-sequelize')(session.Store);
const dbTech = require('./models/')
const exphbs = require('express-handlebars');

const hbs = exphbs.create({ 
  defaultLayout: 'main',
  partialsDir: ['views/partials/']
});

const app = express();
const PORT = process.env.PORT;

app.use(express.urlencoded({ extended: true }));

app.use(session({
  secret: process.env.SESSION_SECRET,
  store: new SequelizeStore({
    db: dbTech,
    table: 'Sessions',
    model: 'Sessions'
  }),
  resave: false,
  saveUninitialized: false,
  cookie: { secure: 'auto', httpOnly: true, maxAge: 60000*100 }
}));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.static('public'));
app.use(express.json());

const routes = require('./routes/index');
app.use('/', routes);

app.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});