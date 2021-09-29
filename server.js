const path = require('path');
const express = require('express');
const exphbs = require('express-handlebars');
//const socket = require('socket.io');

const routes = require('./routes');
const sequelize = require('./config/connection');
const { Match, Text } = require('./models');

const app = express();
const server = require('http').createServer(app)
//const io = socket(server);
const PORT = process.env.PORT || 3001;
require('./socket')(server);

const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

// io.on('connection', (socket) => {
//     console.log('got connection');
//     socket.on('type', (data) => {
//         console.log(data)
//         socket.broadcast.emit('p2typed', data);
//     });
// });

sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => console.log('Now listening'));
});
