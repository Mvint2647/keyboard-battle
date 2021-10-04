const path = require('path');
const express = require('express');
const session = require('express-session');
const exphbs = require('express-handlebars');
require('dotenv').config();

const routes = require('./routes');
const sequelize = require('./config/connection');
const { Match, Text } = require('./models');

const app = express();
const server = require('http').createServer(app)
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({});

var sessionMiddleware = session({
    secret: process.env.SECRET || 'test secret',
    resave: true,
    saveUninitialized: true
});

app.use(sessionMiddleware);
//initialize socket and pass it the server and session
require("./socket")(server, sessionMiddleware)

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});



