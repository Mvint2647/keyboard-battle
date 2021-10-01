const router = require('express').Router();
const path = require('path');
const { createQueryID } = require('../../utils');
const { Match } = require('../../models');

router.post('/createuser', async (req, res) => {

});

router.post('/login', async (req, res) => {
    if (req.session.loggedIn) {
        console.log(req.session)
        res.json({message: `You're already logged in as ${req.session.playerID}`});
    } else {
        req.session.loggedIn = true;
        req.session.playerID = req.body.email;
        console.log(req.session);
        res.json({ user: 'none', message: 'You are now logged in!' });
    }
});

router.get('/match/create', async (req, res) => {
    if(req.session.loggedIn) {
        const newMatch = await Match.create({
            queryID: createQueryID(),
            player1_id: req.session.playerID
        });
        res.redirect(`../match/${newMatch.queryID}`);
    } else {
        res.redirect('../../');
    }
});

router.get('/match/:matchID', async (req, res) => {
    if(req.session.loggedIn) {
        const matchID = req.params.matchID;
        const requestedMatch = await Match.findAll({
            where: {
                queryID: matchID
            }
        })
        res.sendFile(path.join(__dirname, '../../public/test/matchTest.html'));
    } else {
        res.redirect('../../');
    }
});

module.exports = router;