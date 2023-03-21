const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
const routes = require('./controllers');
const helpers = require('./utils/helpers');

const sequelize = require('./config/connection');
const SequelizeStore = require('connect-session-sequelize')(session.Store);

require("dotenv").config();
const cloudinary = require("cloudinary").v2;

console.log(cloudinary.config().cloud_name);

const app = express();
const PORT = process.env.PORT || 3001;

//Need to do this in terminal for jawsdb "heroku addons:create jawsdb" in Heroku

const hbs = exphbs.create({ helpers });

const sess = {
    secret: 'Super secret secret',
    cookie: {maxAge: 3600000},
    resave: false,
    saveUninitialized: true,
    store: new SequelizeStore({
      db: sequelize
    })
  };
  
  app.use(session(sess));
  
  app.engine('handlebars', hbs.engine);
  app.set('view engine', 'handlebars');
  
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));
  app.use(express.static(path.join(__dirname, 'public')));
  
  app.use(routes);
  
  sequelize.sync({ force: false }).then(() => {
    app.listen(PORT, () => console.log(`Now listening to server at http://localhost:${PORT}`))
  });