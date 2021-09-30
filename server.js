const path = require('path');
const express = require('express');
const session = require('express-session');
//const sharedsession = require("express-socket.io-session");
const exphbs = require('express-handlebars');

const routes = require('./routes');
const sequelize = require('./config/connection');
const { Match, Text } = require('./models');

const app = express();
const server = require('http').createServer(app)
//const io = require("socket.io")(server)
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({});

var sessionMiddleware = session({
    secret: 'testSecret',
    resave: true,
    saveUninitialized: true
});

app.use(sessionMiddleware);
//initialize socket and pass it the server and session
require("./socket")(server, sessionMiddleware)

// io.use(sharedsession(sessionMiddleware, {
//     autoSave: true
// }));

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

<<<<<<< HEAD
=======



>>>>>>> 8fd76f3970eb276bb0a50d2c8cc640f700b7efd8
sequelize.sync({ force: false }).then(() => {
  server.listen(PORT, () => console.log('Now listening'));
});



