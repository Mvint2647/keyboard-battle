const router = require('express').Router();
const apiRoutes = require('./api');
const testRoutes = require('./test')
const path = require('path');
const {Match, Player } = require('../models');

router.use('/api', apiRoutes);

router.get('/',(req, res) => {
    res.render('homepage', {loggedIn: req.session.loggedIn})

})
router.get('/login',(req, res) => {
    if (req.session.loggedIn){
        res.redirect('../');
    }
    res.render('login')
})

router.get('/logout',(req, res) => {
    req.session.loggedIn = false;
    req.session.playerID = null;
    res.redirect('../');
})

//match directories
router.get('/match',(req, res) => {
    res.render('matchpage', )
})

router.get('/match/:matchID', async (req, res) => {
    if(req.session.loggedIn) {
        const matchID = req.params.matchID;
        const requestedMatch = await Match.findOne({
            where: {
                queryID: matchID
            }
        })
        if (requestedMatch) {
            const player1 = await Player.findOne({
                where: {
                    id: req.session.playerID
                }
            })
            res.render('matchpage', {Player1Name: player1.name, Player2Name: "???"});
        }
    } else {
        res.redirect(`../../login/${req.params.matchID}`);
    }
});

//the following are testing routes. just let me know if you wanna delete them -lily.
router.use('/test', testRoutes);

module.exports = router;