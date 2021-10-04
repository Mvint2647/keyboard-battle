const router = require('express').Router();
const bcrypt = require('bcrypt');
const Player = require('../../models/Player');


// Create a new player 
router.post('/', async (req, res) => {
  try {
    console.log("player", req.body);
    const playerData = await Player.create({
      name: req.body.name,
      email: req.body.email,
      password: req.body.password,
    });

    req.session.save(() => {
      req.session.loggedIn = true;
      req.session.playerID = playerData.id;

      res.status(200).json(playerData);
    });
  } catch (err) {
    console.log(err);
    res.status(500).json(err);
  }
});

router.post('/login', async (req, res) => {
  console.log("route");
  try {
    // we search the DB for a user with the provided email
    const playerData = await Player.findOne({ where: { email: req.body.email } });
    if (!playerData) {
      // the error message shouldn't specify if the login failed because of wrong email or password
      res.status(404).json({ message: 'Login failed. Please try again!' });
      return;
    }
    // use `bcrypt.compare()` to compare the provided password and the hashed password
    const validPassword = await bcrypt.compare(
      req.body.password,
      playerData.password
    );
    console.log(validPassword);
    // if they do not match, return error message
    if (!validPassword) {
      res.status(400).json({ message: 'Login failed. Please try again!' });
      return;
    } else {
      req.session.loggedIn = true;
      req.session.playerID = playerData.id;
    }
    // if they do match, return success message
    res.status(200).json({ message: 'You are now logged in!' });
  } catch (err) {
    res.status(500).json(err);
  }
});


// get all players
router.get("/", async (req, res) => {
  const players = await Player.findAll();
  res.status(200).json(players);
});

// Logout
router.post('/logout', (req, res) => {
  if (req.session.loggedIn) {
    req.session.destroy(() => {
      res.status(204).end();
    });
  } else {
    res.status(404).end();
  }
});

module.exports = router;
