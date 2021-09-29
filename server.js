const path = require('path');
const express = require('express');
//const exphbs = require('express-handlebars');
const socket = require('socket.io');
const http = require('http');

const routes = require('./routes');
const sequelize = require('./config/connection');
const { Match, Text } = require('./models');

const app = express();
const server = http.createServer(app)
const io = socket(server);
const PORT = process.env.PORT || 3001;


const hbs = exphbs.create({});

app.engine('handlebars', hbs.engine);
app.set('view engine', 'handlebars');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', routes);

/*const testMatch = async () => {
    try{
        const allMatchData = await Match.findAll({
            include: [{ model: Text }],
        });
        console.log();
    } catch (err) {
        console.log(err);
    }
}*/

io.on('connection', (socket) => {
    console.log('got connection');
    socket.on('type', (data) => {
        socket.broadcast('p2typed');
    });
});

sequelize.sync({ force: false }).then(() => {
    server.listen(PORT, () => console.log('Now listening'));
});
