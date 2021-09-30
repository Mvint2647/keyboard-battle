const router = require('express').Router();
const path = require('path');
const { Match } = require('../../models');

router.post('/createuser', async (req, res) => {

});

router.post('/login', async (req, res) => {
    if (req.session.loggedIn) {
        console.log(req.session)
        req.session.loggedIn = true;
        req.session.save();

        res.json({message: "You're already logged in"});
    } else {
        req.session.loggedIn = true;
        req.session.save();
        res.json({ user: 'none', message: 'You are now logged in!' });
        
        // req.session.save(() => {
        //     req.session.loggedIn = true;
        //     res.json({ user: 'none', message: 'You are now logged in!' });
        // });
    }
});

router.get('/match/:matchID', async (req, res) => {
    const matchID = req.params.matchID.toLowerCase();
    const requestedMatch = await Match.findAll({
        where: {
            queryID: matchID
        }
    })
    console.log(requestedMatch)
    res.sendFile(path.join(__dirname, '../../public/test/matchTest.html'));
});

module.exports = router;